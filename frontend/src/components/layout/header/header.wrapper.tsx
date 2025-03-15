"use client";
import { usePathname } from "next/navigation";
import { Header } from "./header.layout";

export default function HeaderWrapper() {
    const pathname = usePathname();
    return <>{pathname.includes("/dashboard") ? null : <Header />}</>;
}
