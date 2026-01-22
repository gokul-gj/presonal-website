"use client";

import { motion } from "framer-motion";

const SOCIAL_LINKS = [
    { name: "TWITTER (X)", href: "https://twitter.com/gokul_gj", label: "Follow on X" },
    { name: "LINKEDIN", href: "https://linkedin.com/in/gokul-gj", label: "Connect on LinkedIn" },
    { name: "INSTAGRAM", href: "https://instagram.com/gokul.gj", label: "Follow on Instagram" },
];

export default function Footer() {
    return (
        <footer className="relative bg-black py-24 px-4 md:px-8 overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left: CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2
                            className="text-6xl md:text-8xl font-bold text-white mb-6 leading-none"
                            style={{ fontFamily: 'var(--font-primary)' }}
                        >
                            Let's Talk
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl max-w-lg mb-8">
                            Have a project in mind? Let's build something amazing together.
                        </p>

                        {/* Social Links */}
                        <div className="flex flex-col gap-4">
                            {SOCIAL_LINKS.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider"
                                >
                                    <span className="w-8 h-0.5 bg-white/30 group-hover:bg-white group-hover:w-12 transition-all" />
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Contact Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass rounded-3xl p-8 md:p-12"
                    >
                        <div className="space-y-6">
                            <div>
                                <p className="text-white/50 text-sm uppercase tracking-wider mb-2">Email</p>
                                <a
                                    href="mailto:hello@gokul.dev"
                                    className="text-2xl md:text-3xl font-semibold text-white hover:text-purple-400 transition-colors"
                                >
                                    hello@gokul.dev
                                </a>
                            </div>

                            <div className="border-t border-white/10 pt-6">
                                <p className="text-white/50 text-sm uppercase tracking-wider mb-2">Location</p>
                                <p className="text-xl text-white/90">Bangalore, India 🇮🇳</p>
                            </div>

                            <div className="border-t border-white/10 pt-6">
                                <p className="text-white/50 text-sm uppercase tracking-wider mb-2">Currently</p>
                                <p className="text-xl text-white/90">Open to opportunities</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-white/40 text-sm">
                        © 2026 Gokul GJ. All rights reserved.
                    </p>
                    <p className="text-white/40 text-sm">
                        Built with Next.js, Tailwind & Framer Motion
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
