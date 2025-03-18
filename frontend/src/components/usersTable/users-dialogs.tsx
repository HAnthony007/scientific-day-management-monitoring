"use client";

import { useUsers } from "@/features/users/context/users-context";
import { UsersActionDialog } from "./users-action-dialog";
import { UsersDeleteDialog } from "./users-delete-dialog";
import { UsersInviteDialog } from "./users-invite-dialog";

export function UsersDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useUsers();
    return (
        <>
            <UsersActionDialog
                key="user-add"
                open={open === "add"}
                onOpenChange={() => setOpen("add")}
            />

            <UsersInviteDialog
                key="user-invite"
                open={open === "invite"}
                onOpenChange={() => setOpen("invite")}
            />

            {currentRow && (
                <>
                    <UsersActionDialog
                        key={`user-edit-${currentRow.id_user}`}
                        open={open === "edit"}
                        onOpenChange={() => {
                            setOpen("edit");
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />

                    <UsersDeleteDialog
                        key={`user-delete-${currentRow.id_user}`}
                        open={open === "delete"}
                        onOpenChange={() => {
                            setOpen("delete");
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />
                </>
            )}
        </>
    );
}
