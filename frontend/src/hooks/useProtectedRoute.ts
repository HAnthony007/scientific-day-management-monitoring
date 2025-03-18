"use client";

import { useAuthStore } from "@/stores/AuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useProtectedRoute() {
    const router = useRouter();
    const pathname = usePathname();

    const [loading, setLoading] = useState(true);
    const [authentificated, setAuthentifated] = useState(false);

    const { user } = useAuthStore();

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const role =
        typeof window !== "undefined" ? localStorage.getItem("role") : null;

    useEffect(() => {
        const isAuthentificated = !!token && !!role && !!user;

        const isAuthorizedPath =
            pathname.includes(`/${role}`) || pathname === "/";

        if (isAuthentificated && isAuthorizedPath) {
            router.push("/login");
            toast.error(
                "Vous devez vous authentifie pour acceder a cette page."
            );
        } else {
            setAuthentifated(true);
            setLoading(false);
        }
    }, [token, role, user, pathname, router]);

    return { loading, authentificated, role };
}
