"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Code2, Database, Brain, TrendingUp } from "lucide-react";

const TABS = [
    {
        id: "frontend",
        label: "Frontend",
        icon: Code2,
        title: "Beautiful Interfaces",
        description: "Crafting pixel-perfect, responsive web experiences with modern frameworks and cutting-edge animation libraries.",
        tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
        id: "backend",
        label: "Backend",
        icon: Database,
        title: "Scalable Systems",
        description: "Building robust server architectures that handle millions of requests with reliability and performance.",
        tech: ["Node.js", "Python", "PostgreSQL", "Redis", "AWS"],
        gradient: "from-green-500/20 to-teal-500/20"
    },
    {
        id: "ai",
        label: "AI/ML",
        icon: Brain,
        title: "Intelligent Solutions",
        description: "Leveraging machine learning and LLMs to create autonomous agents and intelligent user experiences.",
        tech: ["OpenAI", "LangChain", "RAG", "Vector DBs", "Fine-tuning"],
        gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
        id: "trading",
        label: "Trading",
        icon: TrendingUp,
        title: "Algorithmic Trading",
        description: "Developing quantitative strategies and automated trading systems for options and derivatives markets.",
        tech: ["Python", "Options Greeks", "Backtesting", "Risk Management", "Real-time Data"],
        gradient: "from-orange-500/20 to-red-500/20"
    }
];

export default function InteractiveTabs() {
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const activeTabData = TABS.find(tab => tab.id === activeTab) || TABS[0];

    return (
        <section className="min-h-screen bg-gradient-to-br from-zinc-950 via-neutral-950 to-black py-32 px-4 md:px-8 relative overflow-hidden">
            {/* Dot grid pattern overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }} />

            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br ${activeTabData.gradient} blur-3xl opacity-40 transition-all duration-1000`} />
                <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br ${activeTabData.gradient} blur-3xl opacity-30 transition-all duration-1000`} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-[10vw] md:text-[8vw] lg:text-7xl font-serif text-white tracking-tight leading-none mb-4">
                        What I Build
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl">
                        Versatile expertise across the full stack, from beautiful UIs to intelligent systems
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-4 mb-12 border-b border-white/10 pb-8">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className="relative group"
                            >
                                <div className={`
                                flex items-center gap-3 px-6 py-4 rounded-lg
                                transition-all duration-300
                                ${isActive
                                        ? 'bg-white/15 text-white shadow-lg shadow-blue-500/20 border border-white/20'
                                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                                    }
                            `}>
                                    <Icon className="w-5 h-5" />
                                    <span className="text-lg font-medium">{tab.label}</span>
                                </div>

                                {/* Active indicator with glow */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left: Content */}
                        <div>
                            <h3 className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight">
                                {activeTabData.title}
                            </h3>
                            <p className="text-xl text-white/70 mb-8 leading-relaxed">
                                {activeTabData.description}
                            </p>

                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-3">
                                {activeTabData.tech.map((item, index) => (
                                    <motion.span
                                        key={item}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className={`
                                        px-5 py-2.5 rounded-full 
                                        bg-gradient-to-br ${activeTabData.gradient}
                                        border-2 border-white/30
                                        text-white text-sm font-semibold
                                        backdrop-blur-sm
                                        hover:border-white/50 transition-all
                                        shadow-lg
                                    `}
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Right: Visual */}
                        <div className="relative h-[400px] md:h-[500px]">
                            <div className={`
                            absolute inset-0 rounded-2xl border-2 border-white/20
                            bg-gradient-to-br ${activeTabData.gradient}
                            backdrop-blur-xl overflow-hidden
                            flex items-center justify-center
                            shadow-2xl shadow-black/50
                        `}>
                                {/* Icon Display */}
                                {(() => {
                                    const Icon = activeTabData.icon;
                                    return (
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                                            animate={{ scale: 1, opacity: 0.2, rotate: 0 }}
                                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                        >
                                            <Icon className="w-64 h-64 text-white" strokeWidth={1} />
                                        </motion.div>
                                    );
                                })()}

                                {/* Floating particles */}
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-white/40 rounded-full"
                                        animate={{
                                            x: [0, Math.random() * 100 - 50, 0],
                                            y: [0, Math.random() * 100 - 50, 0],
                                            opacity: [0.4, 0.8, 0.4]
                                        }}
                                        transition={{
                                            duration: 3 + Math.random() * 2,
                                            repeat: Infinity,
                                            delay: i * 0.2
                                        }}
                                        style={{
                                            left: `${20 + i * 15}%`,
                                            top: `${30 + i * 10}%`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
