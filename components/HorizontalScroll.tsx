"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Zap, Rocket, Target } from "lucide-react";

const FEATURE_CARDS = [
    {
        title: "Lightning Fast",
        description: "Optimized performance with Next.js 14, ensuring instant page loads and smooth interactions.",
        icon: Zap,
        gradient: "from-yellow-500 to-orange-500",
        glow: "shadow-yellow-500/50"
    },
    {
        title: "Modern Stack",
        description: "Built with cutting-edge technologies: React 18, TypeScript, Framer Motion, and Tailwind CSS.",
        icon: Sparkles,
        gradient: "from-purple-500 to-pink-500",
        glow: "shadow-purple-500/50"
    },
    {
        title: "Scalable Architecture",
        description: "Clean, maintainable code structure designed to grow with your needs and handle complexity.",
        icon: Rocket,
        gradient: "from-blue-500 to-cyan-500",
        glow: "shadow-blue-500/50"
    },
    {
        title: "Pixel Perfect",
        description: "Meticulous attention to detail in every component, animation, and interaction across all devices.",
        icon: Target,
        gradient: "from-green-500 to-teal-500",
        glow: "shadow-green-500/50"
    }
];

export default function HorizontalScroll() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Transform vertical scroll into horizontal movement
    // Cards move from right (100vw) to left (-100vw)
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0vw", "-300vw"] // Adjust based on number of cards
    );

    return (
        <section
            ref={containerRef}
            className="relative h-[400vh] bg-black" // Tall container for scroll control
        >
            {/* Sticky container that holds the horizontally scrolling content */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

                {/* Section Title - Fixed on left */}
                <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-20">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[8vw] md:text-7xl font-serif text-white tracking-tight leading-none writing-mode-vertical md:writing-mode-horizontal rotate-180 md:rotate-0"
                    >
                        Tech
                        <br />
                        Stack
                    </motion.h2>
                </div>

                {/* Horizontally scrolling cards */}
                <motion.div
                    style={{ x }}
                    className="absolute left-0 h-full flex items-center gap-8 pl-[30vw] md:pl-[40vw]"
                >
                    {FEATURE_CARDS.map((card, index) => {
                        const Icon = card.icon;

                        return (
                            <motion.div
                                key={index}
                                className="relative flex-shrink-0 w-[80vw] md:w-[500px] h-[400px] md:h-[500px] group"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.2 }}
                            >
                                {/* Card */}
                                <div className={`
                                    relative w-full h-full rounded-2xl 
                                    bg-gradient-to-br ${card.gradient}
                                    p-[2px] overflow-hidden
                                    transition-all duration-500
                                    group-hover:scale-105 group-hover:shadow-2xl ${card.glow}
                                `}>
                                    {/* Inner card content */}
                                    <div className="w-full h-full bg-black rounded-2xl p-8 md:p-12 flex flex-col justify-between">
                                        {/* Icon */}
                                        <div className="relative">
                                            <div className={`
                                                w-16 h-16 md:w-20 md:h-20 rounded-full 
                                                bg-gradient-to-br ${card.gradient}
                                                flex items-center justify-center
                                                group-hover:scale-110 transition-transform duration-500
                                            `}>
                                                <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />
                                            </div>

                                            {/* Glow effect */}
                                            <div className={`
                                                absolute inset-0 rounded-full blur-xl opacity-50
                                                bg-gradient-to-br ${card.gradient}
                                                group-hover:opacity-75 transition-opacity duration-500
                                            `} />
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <h3 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                                                {card.title}
                                            </h3>
                                            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                                                {card.description}
                                            </p>
                                        </div>

                                        {/* Card number */}
                                        <div className="absolute top-8 right-8 md:top-12 md:right-12">
                                            <span className="text-8xl md:text-9xl font-serif text-white/5 select-none">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Ambient light */}
                                <div className={`
                                    absolute inset-0 rounded-2xl blur-3xl opacity-20
                                    bg-gradient-to-br ${card.gradient}
                                    -z-10 group-hover:opacity-40 transition-opacity duration-500
                                `} />
                            </motion.div>
                        );
                    })}

                    {/* End spacer */}
                    <div className="w-[50vw] flex-shrink-0" />
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 right-8 md:bottom-16 md:right-16 z-20"
                >
                    <div className="flex items-center gap-3 text-white/40 text-sm font-mono">
                        <span className="hidden md:inline">Scroll to explore</span>
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex gap-1"
                        >
                            <div className="w-1 h-1 bg-white/40 rounded-full" />
                            <div className="w-1 h-1 bg-white/40 rounded-full" />
                            <div className="w-1 h-1 bg-white/40 rounded-full" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
