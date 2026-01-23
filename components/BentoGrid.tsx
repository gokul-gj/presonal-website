"use client";

import { motion } from "framer-motion";
import { Code2, Database, Brain, TrendingUp, Sparkles, Zap, BarChart3, Cloud, PieChart } from "lucide-react";
import BentoCard from "./BentoCard";

const ITEMS = [
    {
        id: "ai-ml",
        title: "AI & Machine Learning",
        description: "Building intelligent systems with deep learning, NLP, and computer vision",
        icon: Brain,
        tech: ["TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face"],
        gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
        gridClass: "col-span-full md:col-span-2 md:row-span-2"
    },
    {
        id: "data-science",
        title: "Data Science & Analytics",
        description: "Transform raw data into actionable insights",
        icon: BarChart3,
        tech: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
        gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)",
        gridClass: "col-span-full md:col-span-2 md:row-span-1"
    },
    {
        id: "big-data",
        title: "Big Data Engineering",
        description: "Processing massive datasets at scale",
        icon: Database,
        tech: ["Spark", "Hadoop", "Kafka", "Airflow"],
        gradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(20, 184, 166, 0.2) 100%)",
        gridClass: "col-span-full md:col-span-1 md:row-span-1"
    },
    {
        id: "visualization",
        title: "Data Visualization",
        description: "Bringing data to life with interactive dashboards",
        icon: PieChart,
        tech: ["D3.js", "Plotly", "Tableau", "Custom Viz"],
        gradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)",
        gridClass: "col-span-full md:col-span-1 md:row-span-1"
    },
    {
        id: "trading",
        title: "Options Trading & Quant",
        description: "Quantitative analysis and algorithmic trading strategies",
        icon: TrendingUp,
        tech: ["Python", "Greeks", "Backtesting", "Risk Mgmt"],
        gradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)",
        gridClass: "col-span-full md:col-span-2 md:row-span-1"
    },
    {
        id: "frontend",
        title: "Beautiful Interfaces",
        description: "Crafting pixel-perfect, responsive web experiences",
        icon: Code2,
        tech: ["React", "Next.js", "TypeScript", "Tailwind"],
        gradient: "linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
        gridClass: "col-span-full md:col-span-2 md:row-span-1"
    },
    {
        id: "llm",
        title: "LLM Applications",
        description: "Leveraging large language models for intelligent apps",
        icon: Sparkles,
        tech: ["OpenAI", "LangChain", "RAG", "Vector DBs"],
        gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
        gridClass: "col-span-full md:col-span-1 md:row-span-1"
    },
    {
        id: "cloud",
        title: "Cloud & DevOps",
        description: "Scalable infrastructure and deployment",
        icon: Cloud,
        tech: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)",
        gridClass: "col-span-full md:col-span-1 md:row-span-1"
    },
    {
        id: "performance",
        title: "Performance Obsessed",
        description: "Optimizing for blazing-fast user experiences",
        icon: Zap,
        tech: ["Web Vitals", "CDN", "Caching", "SSR"],
        gradient: "linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(132, 204, 22, 0.2) 100%)",
        gridClass: "col-span-full md:col-span-1 md:row-span-1"
    }
];

export default function BentoGrid() {
    return (
        <section className="min-h-screen bg-black py-24 px-4 md:px-8 relative overflow-hidden">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2
                        className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-4"
                        style={{ fontFamily: 'var(--font-primary)' }}
                    >
                        What I Build
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl">
                        Versatile expertise across the full stack—from beautiful UIs to intelligent systems
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {ITEMS.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <BentoCard
                                key={item.id}
                                className={item.gridClass}
                                gradient={item.gradient}
                            >
                                <div className="flex flex-col h-full">
                                    {/* Icon */}
                                    <div className="mb-6">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                            style={{
                                                background: item.gradient,
                                                border: '1px solid rgba(255, 255, 255, 0.2)'
                                            }}
                                        >
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/70 text-base md:text-lg mb-6 flex-grow">
                                        {item.description}
                                    </p>

                                    {/* Tech Pills */}
                                    <div className="flex flex-wrap gap-2">
                                        {item.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium backdrop-blur-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </BentoCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
