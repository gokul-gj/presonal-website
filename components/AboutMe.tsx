'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Briefcase, Code, Sparkles } from 'lucide-react';

export default function AboutMe() {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/gokul_original.pdf';
        link.download = 'Gokul_GJ_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const skills = [
        "AI & Machine Learning",
        "Data Science & Analytics",
        "Big Data Engineering",
        "Algorithmic Trading",
        "React & Next.js",
        "Beautiful UI Design",
        "LLM Applications",
        "Cloud Architecture"
    ];

    return (
        <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-24 px-6 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-8 h-8 text-purple-400" />
                            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                About Me
                            </h2>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed">
                            I'm an AI/ML Engineer and Data Scientist passionate about transforming data into actionable insights and building intelligent systems. From developing machine learning models to designing algorithmic trading strategies, I combine technical depth with creative problem-solving to deliver impactful solutions.
                        </p>

                        <p className="text-gray-400 leading-relaxed">
                            My expertise spans the entire data pipeline—from big data engineering and analytics to deploying production-ready ML models and beautiful user interfaces. I thrive on challenges that push the boundaries of what's possible with data and AI.
                        </p>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            {skills.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300 backdrop-blur-sm"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Interactive Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center"
                    >
                        <div className="relative group">
                            {/* Glowing Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

                            {/* Card */}
                            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl border border-purple-500/30 backdrop-blur-xl">
                                <div className="flex flex-col items-center text-center space-y-6">
                                    {/* Icon */}
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                                        <Briefcase className="w-10 h-10 text-white" />
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold text-white">
                                            Let's Work Together
                                        </h3>
                                        <p className="text-gray-400">
                                            Download my resume to learn more about my experience and skills
                                        </p>
                                    </div>

                                    {/* Download Button */}
                                    <motion.button
                                        onClick={handleDownload}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group/btn relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Button Shimmer Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>

                                        <span className="relative flex items-center justify-center gap-3">
                                            <Download className="w-5 h-5" />
                                            Download Resume
                                        </span>
                                    </motion.button>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-6 w-full pt-6 border-t border-gray-700">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                5+
                                            </div>
                                            <div className="text-sm text-gray-400 mt-1">
                                                Years Experience
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                50+
                                            </div>
                                            <div className="text-sm text-gray-400 mt-1">
                                                Projects Deployed
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
