"use client";

import Navbar from "@/components/Navbar";
import BlogPostCard from "@/components/BlogPostCard";
import { motion } from "framer-motion";
import { getBlogsByCategory, blogCategories } from "@/lib/blogData";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectManagementPage() {
    const blogs = getBlogsByCategory("project-management");
    const categoryData = blogCategories["project-management"];

    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 md:px-8 max-w-[1800px] mx-auto relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br ${categoryData.gradient} rounded-full blur-3xl opacity-30`} />
                </div>

                {/* Dot pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                        backgroundSize: '32px 32px'
                    }}
                />

                <div className="relative z-10">
                    {/* Back button */}
                    <Link href="/blogs">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 group"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to all blogs</span>
                        </motion.div>
                    </Link>

                    {/* Icon and Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-8xl mb-6">{categoryData.icon}</div>
                        <h1 className="text-[12vw] md:text-[10vw] lg:text-8xl font-serif text-white mb-6 leading-none tracking-tight">
                            {categoryData.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed">
                            {categoryData.description}
                        </p>
                    </motion.div>

                    {/* Stats bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 flex flex-wrap gap-8"
                    >
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-4">
                            <div className="text-3xl font-bold text-white mb-1">{blogs.length}</div>
                            <div className="text-white/60 text-sm">Articles</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-4">
                            <div className="text-3xl font-bold text-white mb-1">
                                {Math.round(blogs.reduce((acc, blog) => acc + parseInt(blog.readTime), 0) / blogs.length)}
                            </div>
                            <div className="text-white/60 text-sm">Avg. read time</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-20 px-4 md:px-8 max-w-[1800px] mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((post, index) => (
                            <BlogPostCard key={post.slug} post={post} index={index} />
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Bottom CTA */}
            <section className="py-32 px-4 md:px-8 max-w-[1800px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        Interested in Trading?
                    </h2>
                    <p className="text-xl text-white/70 mb-8">
                        Explore our algorithmic trading insights
                    </p>
                    <Link href="/blogs/trading">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                        >
                            View Trading Articles
                        </motion.button>
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
