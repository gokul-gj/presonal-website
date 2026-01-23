"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const TECH_CATEGORIES = {
    "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Hugging Face", "OpenCV"],
    "Data & Analytics": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "SQL"],
    "Big Data": ["Apache Spark", "Hadoop", "Kafka", "Airflow", "PostgreSQL", "MongoDB"],
    "LLMs & NLP": ["OpenAI", "LangChain", "RAG", "Vector DBs", "Transformers", "BERT"],
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "D3.js"],
    "Trading": ["Python", "Options Greeks", "TA-Lib", "Backtrader", "Quantitative Analysis", "Risk Management"],
    "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Nginx"]
};

export default function SkillsShowcase() {
    return (
        <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-32 px-4 md:px-8 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
                        style={{ fontFamily: 'var(--font-primary)' }}
                    >
                        Tech Stack
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                        Technologies and tools I work with to build intelligent, scalable, and beautiful solutions
                    </p>
                </motion.div>

                {/* Technology Categories */}
                <div className="space-y-12">
                    {Object.entries(TECH_CATEGORIES).map(([category, technologies], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                        >
                            {/* Category Title */}
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></span>
                                {category}
                            </h3>

                            {/* Technology Pills */}
                            <div className="flex flex-wrap gap-3">
                                {technologies.map((tech, techIndex) => (
                                    <motion.div
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="group relative"
                                    >
                                        {/* Glow effect on hover */}
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-50 blur transition duration-300"></div>

                                        {/* Pill */}
                                        <div className="relative px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                                            <span className="text-white/90 font-medium text-sm md:text-base">
                                                {tech}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Accent */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                />
            </div>
        </section>
    );
}
