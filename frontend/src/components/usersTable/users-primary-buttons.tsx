"use client";

import { useUsers } from "@/features/users/context/users-context";
import { MailPlusIcon, UserPlus2Icon } from "lucide-react";
import { Button } from "../ui/button";

export function UsersPrimaryButtons() {
    const { setOpen } = useUsers();
    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                className="space-x-1"
                // onClick={() => toast.success("Invite User")}
                onClick={() => setOpen("invite")}
            >
                <span>Invite User</span> <MailPlusIcon />
            </Button>
            <Button
                className="space-x-1"
                // onClick={() => toast.success("Add User")}
                onClick={() => setOpen("add")}
            >
                <span>Add User</span> <UserPlus2Icon />
            </Button>
        </div>
    );
}
