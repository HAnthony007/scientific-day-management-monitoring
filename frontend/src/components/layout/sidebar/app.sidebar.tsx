"use client";

import { Icons } from "@/components/icon/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { navItems } from "@/constants/data";
import {
    BadgeCheck,
    Bell,
    ChevronRight,
    ChevronsUpDown,
    CreditCard,
    LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <div className="flex gap-2 text-sidebar-accent-foreground">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <Icons.logo />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            Scientific day
                        </span>
                        <span className="truncate text-xs">
                            Monitoring&Management
                        </span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="overflow-x-hidden">
                <SidebarGroup>
                    <SidebarGroupLabel>Overview</SidebarGroupLabel>
                    <SidebarMenu>
                        {navItems.map((item) => {
                            const Icon = item.icon
                                ? Icons[item.icon]
                                : Icons.logo;

                            return item?.items && item?.items?.length > 0 ? (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                isActive={pathname === item.url}
                                            >
                                                {item.icon && <Icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={
                                                                pathname ===
                                                                subItem.url
                                                            }
                                                        >
                                                            <Link
                                                                href={
                                                                    subItem.url
                                                                }
                                                            >
                                                                <span>
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={pathname === item.url}
                                    >
                                        <Link href={item.url}>
                                            <Icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state:open]:bg-sidebar-accent data-[state-open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage alt={"Photo"} />
                                        <AvatarFallback className="rounded-lg">
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            RAKOTOARIMANANA Harifetra Anthony
                                        </span>
                                        <span className="truncate text-xs">
                                            anthonyr.techno@gmail.com
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                side="bottom"
                                sideOffset={4}
                                className="w-[--radix-dropdown-menu-content-width] min-w-56 rounded-lg"
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={""}
                                                alt={"Photo"}
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                CN
                                            </AvatarFallback>
                                            <AvatarFallback className="rounded-lg">
                                                Harifetra Anthony
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                RAKOTOARIMANANA Harifetra
                                                Anthony
                                            </span>
                                            <span className="truncate text-xs">
                                                anthonyr.techno@gmail.com
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck /> Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard /> Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell /> Notifications
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => toast.success("Log out")}
                                    >
                                        <LogOut /> Log Out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
