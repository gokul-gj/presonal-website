"use client";

import { motion } from "framer-motion";

export default function InfiniteMarquee() {
    const text = "CREATIVE DEVELOPER";

    return (
        <section className="relative bg-black py-16 md:py-24 overflow-hidden border-y border-white/10">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5" />

            {/* Marquee container */}
            <div className="relative flex whitespace-nowrap">
                {/* First instance */}
                <motion.div
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex gap-8 md:gap-16 pr-8 md:pr-16"
                >
                    {[...Array(3)].map((_, i) => (
                        <span
                            key={i}
                            className="text-[15vw] md:text-[12vw] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/60 tracking-tighter"
                        >
                            {text}
                        </span>
                    ))}
                </motion.div>

                {/* Second instance (for seamless loop) */}
                <motion.div
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex gap-8 md:gap-16 pr-8 md:pr-16"
                    aria-hidden="true"
                >
                    {[...Array(3)].map((_, i) => (
                        <span
                            key={i}
                            className="text-[15vw] md:text-[12vw] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/60 tracking-tighter"
                        >
                            {text}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Gradient overlays for fade effect */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </section>
    );
}
