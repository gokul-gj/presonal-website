"use client";

import Navbar from "@/components/Navbar";
import BlogCategoryCard from "@/components/BlogCategoryCard";
import BlogPostCard from "@/components/BlogPostCard";
import { motion } from "framer-motion";
import { blogCategories, getBlogsByCategory, getFeaturedBlogs } from "@/lib/blogData";

export default function BlogsPage() {
    const pmBlogs = getBlogsByCategory("project-management");
    const tradingBlogs = getBlogsByCategory("trading");
    const featuredBlogs = getFeaturedBlogs(6);

    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 md:px-8 max-w-[1800px] mx-auto relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    {/* Title with high-contrast typography */}
                    <h1 className="text-[12vw] md:text-[10vw] lg:text-8xl font-serif text-white mb-6 leading-none tracking-tight">
                        Insights &<br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Expertise
                        </span>
                    </h1>

                    {/* Value proposition */}
                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed font-sans">
                        Deep dives into <span className="text-white font-semibold">project management strategies</span> and{" "}
                        <span className="text-white font-semibold">algorithmic trading insights</span>.
                        Practical knowledge from real-world experience.
                    </p>
                </motion.div>
            </section>

            {/* Category Cards Section */}
            <section className="py-20 px-4 md:px-8 max-w-[1800px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-5xl md:text-6xl font-serif text-white mb-4">
                        Explore Topics
                    </h2>
                    <p className="text-white/60 text-lg">
                        Choose your area of interest
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <BlogCategoryCard
                        title={blogCategories["project-management"].title}
                        description={blogCategories["project-management"].description}
                        icon={blogCategories["project-management"].icon}
                        gradient={blogCategories["project-management"].gradient}
                        borderGradient={blogCategories["project-management"].borderGradient}
                        href="/blogs/project-management"
                        count={pmBlogs.length}
                    />
                    <BlogCategoryCard
                        title={blogCategories.trading.title}
                        description={blogCategories.trading.description}
                        icon={blogCategories.trading.icon}
                        gradient={blogCategories.trading.gradient}
                        borderGradient={blogCategories.trading.borderGradient}
                        href="/blogs/trading"
                        count={tradingBlogs.length}
                    />
                </div>
            </section>

            {/* Featured Posts Section */}
            <section className="py-20 px-4 md:px-8 max-w-[1800px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-5xl md:text-6xl font-serif text-white mb-4">
                        Latest Articles
                    </h2>
                    <p className="text-white/60 text-lg">
                        Recent insights and analysis
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredBlogs.map((post, index) => (
                        <BlogPostCard key={post.slug} post={post} index={index} />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-4 md:px-8 max-w-[1800px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
                        {/* Background pattern */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                                backgroundSize: '32px 32px'
                            }}
                        />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                                Ready to Dive Deeper?
                            </h2>
                            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                                Explore our complete collection of articles and insights
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/blogs/project-management"
                                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                                >
                                    View Project Management
                                </a>
                                <a
                                    href="/blogs/trading"
                                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
                                >
                                    View Trading Insights
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
