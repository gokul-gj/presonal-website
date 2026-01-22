import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const classic = Cinzel({ subsets: ["latin"], variable: "--font-classic" });

export const metadata: Metadata = {
    title: "Creative Developer Portfolio",
    description: "Building Intelligence. From RAG Systems to Agentic Workflows.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={clsx(dmSans.variable, playfair.variable, classic.variable, "bg-background font-sans antialiased text-foreground")}>
                {children}
            </body>
        </html>
    );
}
