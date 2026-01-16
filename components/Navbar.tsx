"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

const links = [
    { name: "Projects", href: "/projects" },
    { name: "Travel", href: "/travel" },
    { name: "Blogs", href: "/blogs" },
    { name: "Market Today", href: "/market" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-colors duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
            )}
        >
            <Link
                href="/"
                className="font-classic text-2xl md:text-3xl text-white tracking-widest font-bold hover:opacity-70 transition-opacity"
            >
                Gokul Gj
            </Link>

            <div className="hidden md:flex items-center gap-8">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest font-sans"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Mobile Menu Button (Simplified for now) */}
            <button className="md:hidden text-white uppercase text-sm tracking-widest">
                Menu
            </button>
        </motion.nav>
    );
}
