import type { Metadata } from "next";
import { Inter, Instrument_Serif, Cinzel } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-serif" });
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
            <body className={clsx(inter.variable, serif.variable, classic.variable, "bg-background font-sans antialiased text-foreground")}>
                {children}
            </body>
        </html>
    );
}
