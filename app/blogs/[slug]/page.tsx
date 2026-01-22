"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import BlogPostCard from "@/components/BlogPostCard";
import { motion } from "framer-motion";
import { getBlogBySlug, blogPosts, blogCategories } from "@/lib/blogData";
import { ChevronLeft, Clock, Calendar, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const post = getBlogBySlug(slug);

    if (!post) {
        notFound();
    }

    const categoryData = blogCategories[post.category];
    const relatedPosts = blogPosts
        .filter(p => p.category === post.category && p.slug !== post.slug)
        .slice(0, 3);

    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4 md:px-8 max-w-[1800px] mx-auto relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute top-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-br ${categoryData.gradient} rounded-full blur-3xl opacity-20`} />
                </div>

                <div className="relative z-10 max-w-4xl">
                    {/* Back button */}
                    <Link href={`/blogs/${post.category}`}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 group"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to {categoryData.title}</span>
                        </motion.div>
                    </Link>

                    {/* Category badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                    >
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${categoryData.gradient} border border-white/20 text-white text-sm font-semibold`}>
                            <span>{categoryData.icon}</span>
                            {categoryData.title}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-tight"
                    >
                        {post.title}
                    </motion.h1>

                    {/* Excerpt */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-white/70 leading-relaxed mb-8"
                    >
                        {post.excerpt}
                    </motion.p>

                    {/* Meta info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap items-center gap-6 text-white/60 pb-8 border-b border-white/10"
                    >
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </time>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <span>{post.readTime}</span>
                        </div>
                        <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto">
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-4 md:px-8 max-w-[1800px] mx-auto py-12">
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="prose prose-invert prose-lg max-w-none">
                        {post.content ? (
                            <div
                                className="text-white/80 leading-relaxed space-y-6"
                                dangerouslySetInnerHTML={{
                                    __html: post.content
                                        .split('\n')
                                        .map(line => {
                                            // Convert markdown-like syntax to HTML
                                            if (line.startsWith('# ')) {
                                                return `<h1 class="text-4xl font-serif text-white mt-12 mb-6">${line.slice(2)}</h1>`;
                                            } else if (line.startsWith('## ')) {
                                                return `<h2 class="text-3xl font-serif text-white mt-10 mb-4">${line.slice(3)}</h2>`;
                                            } else if (line.startsWith('### ')) {
                                                return `<h3 class="text-2xl font-serif text-white mt-8 mb-3">${line.slice(4)}</h3>`;
                                            } else if (line.startsWith('- ')) {
                                                return `<li class="ml-6 text-white/80">${line.slice(2)}</li>`;
                                            } else if (line.trim() === '') {
                                                return '<br />';
                                            } else if (line.includes('**')) {
                                                return `<p class="text-white/80 leading-relaxed">${line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')}</p>`;
                                            }
                                            return `<p class="text-white/80 leading-relaxed">${line}</p>`;
                                        })
                                        .join('')
                                }}
                            />
                        ) : (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                                <p className="text-white/60 text-lg mb-4">
                                    Full article content coming soon...
                                </p>
                                <p className="text-white/40">
                                    This blog post is currently being prepared. Check back later for the complete article.
                                </p>
                            </div>
                        )}
                    </div>
                </motion.article>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-20 px-4 md:px-8 max-w-[1800px] mx-auto border-t border-white/10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                            Related Articles
                        </h2>
                        <p className="text-white/60 text-lg">
                            Continue exploring {categoryData.title.toLowerCase()}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedPosts.map((relatedPost, index) => (
                            <BlogPostCard key={relatedPost.slug} post={relatedPost} index={index} />
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-32 px-4 md:px-8 max-w-[1800px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        Explore More Topics
                    </h2>
                    <p className="text-xl text-white/70 mb-8">
                        Discover more insights across different categories
                    </p>
                    <Link href="/blogs">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                        >
                            View All Articles
                        </motion.button>
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
