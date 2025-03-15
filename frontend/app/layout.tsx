import HeaderWrapper from "@/components/layout/header/header.wrapper";
import { ThemeProvider } from "@/components/theme/theme.provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "./globals.css";

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="h-full">
            <body
                className={cn(
                    geistSans.variable,
                    geistMono.variable,
                    "antialiased h-full flex flex-col gap6"
                )}
            >
                <NextTopLoader showSpinner={false} />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <HeaderWrapper />
                    <Toaster position="top-right" richColors closeButton />
                    <main className="flex-1">{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
