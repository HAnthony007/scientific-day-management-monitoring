import HeaderWrapper from "@/components/layout/header-wrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { cn } from "../../src/lib/utils";
import "../globals.css";
import { Providers } from "./provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Scientific Day Management and Monitoring",
    description:
        "An innovative web application designed to streamline the organization, management, and tracking of scientific events within your institution.",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: {
        locale: string;
    };
}>) {
    const resolverParams = await params;
    return (
        <html
            lang={resolverParams.locale}
            suppressHydrationWarning
            className="h-full"
        >
            <body
                className={cn(
                    geistSans.variable,
                    geistMono.variable,
                    "antialiased h-full flex flex-col gap6"
                )}
            >
                <NextTopLoader showSpinner={false} />
                <Providers locale={resolverParams.locale}>
                    <HeaderWrapper />
                    <Toaster position="top-right" richColors closeButton />
                    <main className="flex-1">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
