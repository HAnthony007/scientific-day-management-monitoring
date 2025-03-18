import { NavItem } from "@/types";

export const navItems: NavItem[] = [
    {
        title: "Dashboard",
        url: "/dashboard/overview",
        icon: "dashboard",
        isActive: false,
        shortcut: ["d", "d"],
        items: [],
    },
    {
        title: "Users",
        url: "/dashboard/users",
        icon: "users",
        isActive: false,
        shortcut: ["u", "u"],
        items: [],
    },
    {
        title: "Events",
        url: "/dashboard/events",
        icon: "calendar",
        isActive: false,
        shortcut: ["c", "d"],
        items: [],
    },
];
