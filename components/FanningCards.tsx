"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code, Palette, Database, Globe, Cpu, Layers } from "lucide-react";

const SKILL_CARDS = [
    {
        title: "UI/UX Design",
        description: "Creating intuitive, beautiful interfaces",
        icon: Palette,
        color: "from-pink-500 to-rose-500",
        rotate: -8
    },
    {
        title: "Full Stack Dev",
        description: "End-to-end application development",
        icon: Code,
        color: "from-blue-500 to-cyan-500",
        rotate: -4
    },
    {
        title: "System Architecture",
        description: "Scalable, maintainable solutions",
        icon: Layers,
        color: "from-purple-500 to-violet-500",
        rotate: 0
    },
    {
        title: "Database Design",
        description: "Efficient data modeling & queries",
        icon: Database,
        color: "from-green-500 to-emerald-500",
        rotate: 4
    },
    {
        title: "AI Integration",
        description: "LLMs, RAG, and intelligent agents",
        icon: Cpu,
        color: "from-orange-500 to-amber-500",
        rotate: 8
    },
    {
        title: "Web Performance",
        description: "Optimization and speed tuning",
        icon: Globe,
        color: "from-teal-500 to-cyan-500",
        rotate: 12
    }
];

export default function FanningCards() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    return (
        <section ref={containerRef} className="min-h-screen bg-black py-32 px-4 md:px-8 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 text-center"
                >
                    <h2 className="text-[10vw] md:text-[8vw] lg:text-7xl font-serif text-white tracking-tight leading-none mb-4">
                        Skills & Expertise
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                        A comprehensive toolkit built over years of solving complex problems
                    </p>
                </motion.div>

                {/* Fanning Cards */}
                <div className="relative h-[600px] md:h-[700px] flex items-center justify-center">
                    {SKILL_CARDS.map((card, index) => {
                        const Icon = card.icon;

                        // Calculate initial stacked position (all centered)
                        const initialRotate = 0;
                        const initialY = 0;
                        const initialX = 0;

                        // Calculate final fanned position
                        const finalRotate = card.rotate;
                        const finalY = Math.abs(card.rotate) * 2; // Slight vertical offset based on rotation
                        const finalX = card.rotate * 8; // Horizontal spread

                        // Animate from stacked to fanned based on scroll
                        const rotate = useTransform(
                            scrollYProgress,
                            [0, 0.8],
                            [initialRotate, finalRotate]
                        );

                        const y = useTransform(
                            scrollYProgress,
                            [0, 0.8],
                            [initialY, finalY]
                        );

                        const x = useTransform(
                            scrollYProgress,
                            [0, 0.8],
                            [initialX, finalX]
                        );

                        const opacity = useTransform(
                            scrollYProgress,
                            [0, 0.3],
                            [0.5, 1]
                        );

                        return (
                            <motion.div
                                key={index}
                                style={{
                                    rotate,
                                    y,
                                    x,
                                    opacity,
                                    zIndex: index
                                }}
                                className="absolute w-[280px] md:w-[320px] h-[380px] md:h-[420px] group cursor-pointer"
                                whileHover={{
                                    scale: 1.05,
                                    zIndex: 100,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {/* Card */}
                                <div className={`
                                    relative w-full h-full rounded-2xl
                                    bg-gradient-to-br ${card.color}
                                    p-[2px] shadow-2xl
                                    transition-all duration-300
                                    group-hover:shadow-3xl
                                `}>
                                    {/* Inner content */}
                                    <div className="w-full h-full bg-zinc-950 rounded-2xl p-8 flex flex-col justify-between">
                                        {/* Icon */}
                                        <div className="relative mb-auto">
                                            <div className={`
                                                w-16 h-16 rounded-full
                                                bg-gradient-to-br ${card.color}
                                                flex items-center justify-center
                                                group-hover:scale-110 transition-transform duration-300
                                            `}>
                                                <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                                            </div>

                                            {/* Glow */}
                                            <div className={`
                                                absolute inset-0 rounded-full blur-xl opacity-50
                                                bg-gradient-to-br ${card.color}
                                                group-hover:opacity-75 transition-opacity duration-300
                                            `} />
                                        </div>

                                        {/* Content */}
                                        <div className="mt-auto">
                                            <h3 className="text-3xl font-serif text-white mb-3 leading-tight">
                                                {card.title}
                                            </h3>
                                            <p className="text-white/60 text-sm leading-relaxed">
                                                {card.description}
                                            </p>
                                        </div>

                                        {/* Index number */}
                                        <div className="absolute top-6 right-6">
                                            <span className="text-6xl font-serif text-white/5 select-none">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Ambient glow */}
                                <div className={`
                                    absolute inset-0 rounded-2xl blur-2xl opacity-20
                                    bg-gradient-to-br ${card.color}
                                    -z-10 group-hover:opacity-40 transition-opacity duration-300
                                `} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
