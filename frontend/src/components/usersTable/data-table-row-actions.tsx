"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUsers } from "@/features/users/context/users-context";
import { User } from "@/features/users/data/users-schema";
import { Row } from "@tanstack/react-table";
import { EditIcon, EllipsisIcon, Trash2Icon } from "lucide-react";

interface DataTableRowActionsProps {
    row: Row<User>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const { setOpen, setCurrentRow } = useUsers();
    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <EllipsisIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem
                        onClick={() => {
                            setCurrentRow(row.original);
                            setOpen("edit");
                        }}
                    >
                        Edit
                        <DropdownMenuShortcut>
                            <EditIcon size={16} />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            setCurrentRow(row.original);
                            setOpen("delete");
                        }}
                        className="!text-red-500"
                    >
                        Delete
                        <DropdownMenuShortcut>
                            <Trash2Icon size={16} />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
