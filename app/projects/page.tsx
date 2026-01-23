"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowUpRight, Brain, Cpu, Github, ExternalLink, Code2, Database, Terminal } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const featuredProjects = [
    {
        title: "RAG Agentic Trader",
        description: "Autonomous multi-agent trading system powered by RAG and LLMs. Scans live market data, researches news context, and formulates options strategies with simulated execution.",
        tags: ["Next.js", "LangChain", "Yahoo Finance", "AI"], // Changed Agents to AI
        link: "/projects/rag-trading-system",
        icon: <Brain className="w-6 h-6 text-green-400" />,
        color: "from-green-500/20 to-emerald-500/5",
        border: "group-hover:border-green-500/50"
    },
    {
        title: "Personal Website 2.0",
        description: "A high-performance portfolio site built with Next.js 14, Framer Motion, and Tailwind CSS. Features glassmorphism UI, smooth parallax effects, and live market data integrations.",
        tags: ["React", "TypeScript", "Tailwind", "Framer"],
        link: "/",
        icon: <Cpu className="w-6 h-6 text-blue-400" />,
        color: "from-blue-500/20 to-indigo-500/5",
        border: "group-hover:border-blue-500/50"
    }
];

const githubRepos = [
    {
        Name: "Delivery_time_prediction",
        Description: "Predicting delivery times using machine learning models.",
        URL: "https://github.com/gokul-gj/Delivery_time_prediction"
    },
    {
        Name: "Image_Classification",
        Description: "Deep learning models for image classification tasks.",
        URL: "https://github.com/gokul-gj/Image_Classification"
    },
    {
        Name: "Cab-Service-Churn-Problem",
        Description: "Ensemble learning to predict driver churn based on demographics and tenure.",
        URL: "https://github.com/gokul-gj/Cab-Service-Chern-Problem---Ensemble-Learning"
    },
    {
        Name: "Netflix_BusinessCase",
        Description: "Data analysis to help Netflix decide on content production and global growth.",
        URL: "https://github.com/gokul-gj/Netfilx_BusineesCase"
    },
    {
        Name: "Digit-recognizer",
        Description: "Identifying digits from handwritten images using Neural Networks.",
        URL: "https://github.com/gokul-gj/Digit-recognizer"
    },
    {
        Name: "Titanic_ML_Project",
        Description: "Predictive model for Titanic survival using Deep Learning & Tensorflow.",
        URL: "https://github.com/gokul-gj/Titanic_ML_Project_Deep-Learning_Tensorflow"
    },
    {
        Name: "Car24_Price_Prediction",
        Description: "Predicting pre-owned car prices based on user specifications.",
        URL: "https://github.com/gokul-gj/car24_price_prediction"
    },
    {
        Name: "Ed_tech_Student_Clustering",
        Description: "Segmenting learners based on job profile and company data.",
        URL: "https://github.com/gokul-gj/Ed_tech_Student_Clustering"
    },
    {
        Name: "Material_Quality_Prediction",
        Description: "Regression and classification to predict Young's Modulus and product quality.",
        URL: "https://github.com/gokul-gj/Prediction-of-quality-using-regression-and-Classifiction-of-material-by-quality"
    },
    {
        Name: "Bike-Sharing-Demand",
        Description: "Analyzing factors affecting demand for shared electric cycles.",
        URL: "https://github.com/gokul-gj/Bike-Sharing-Company"
    },
    {
        Name: "SQL-Retail-Insights",
        Description: "Exploring retail business datasets using complex SQL queries.",
        URL: "https://github.com/gokul-gj/SQL-Retail-Business-Insight"
    },
    {
        Name: "Treadmill-Customer-Profile",
        Description: "Descriptive analytics to create customer profiles for treadmill products.",
        URL: "https://github.com/gokul-gj/Descriptive-analytics-and-Customer-Profile_Treadmill-company"
    },
    {
        Name: "Retail-Chain-Analysis",
        Description: "Analyzing customer purchase behavior against gender and other factors.",
        URL: "https://github.com/gokul-gj/Business-Case-Retail-Chain"
    },
    {
        Name: "Time_Series_Analysis",
        Description: "Projects involving time series forecasting and analysis.",
        URL: "https://github.com/gokul-gj/Time_Series"
    },
    {
        Name: "Admission_Chance_Prediction",
        Description: "Analyzing factors important for graduate admissions.",
        URL: "https://github.com/gokul-gj/Predict_chance_of_admission"
    },
    {
        Name: "MLOps_Specialization",
        Description: "Assignments from Coursera's Machine Learning Engineering for Production.",
        URL: "https://github.com/gokul-gj/coursera-machine-learning-engineering-for-prod-mlops-specialization"
    }
];

export default function Projects() {
    return (
        <main className="bg-background min-h-screen text-white selection:bg-white/20">
            <Navbar />

            <div className="pt-32 px-4 md:px-8 max-w-[1200px] mx-auto pb-20">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">My Work</h1>
                    <p className="text-xl text-white/60 max-w-2xl">
                        A collection of technical projects focusing on AI, algorithmic trading, and modern web interfaces.
                    </p>
                </motion.div>

                {/* Featured Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {featuredProjects.map((project, index) => (
                        <Link key={index} href={project.link}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                                className={`group h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 ${project.border}`}
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} border border-white/5`}>
                                        {project.icon}
                                    </div>
                                    <ArrowUpRight className="w-6 h-6 text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>

                                <h3 className="text-2xl font-bold mb-3 font-serif">{project.title}</h3>
                                <p className="text-white/60 mb-6 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/40 group-hover:text-white/80 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Open Source / GitHub Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Github className="w-6 h-6 text-white/60" />
                        <h2 className="text-3xl font-serif">Open Source Contributions</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {githubRepos.map((repo, i) => (
                            <Link key={i} href={repo.URL} target="_blank" rel="noopener noreferrer">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex flex-col"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-white/60 group-hover:text-white group-hover:bg-white/10 transition-colors">
                                            {repo.Name.toLowerCase().includes('data') || repo.Name.toLowerCase().includes('sql') ? <Database className="w-4 h-4" /> :
                                                repo.Name.toLowerCase().includes('learn') || repo.Name.toLowerCase().includes('predict') ? <Brain className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                                    </div>

                                    <h3 className="text-lg font-bold mb-2 truncate font-mono text-white/80 group-hover:text-white transition-colors">
                                        {repo.Name.replace(/-/g, ' ')}
                                    </h3>
                                    <p className="text-sm text-white/40 line-clamp-2 leading-relaxed group-hover:text-white/60 transition-colors">
                                        {repo.Description || "No description provided."}
                                    </p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

            </div>
        </main>
    );
}
