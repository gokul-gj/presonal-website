"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/blogData";
import { blogCategories } from "@/lib/blogData";

interface BlogPostCardProps {
    post: BlogPost;
    index?: number;
}

export default function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
    const categoryData = blogCategories[post.category];

    return (
        <Link href={`/blogs/${post.slug}`}>
            <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group h-full"
            >
                <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">
                    {/* Gradient Header */}
                    <div className={`relative h-48 bg-gradient-to-br ${categoryData.gradient} overflow-hidden`}>
                        {/* Abstract pattern */}
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 50%),
                                                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)`
                            }}
                        />

                        {/* Large icon watermark */}
                        <div className="absolute -bottom-4 -right-4 text-9xl opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                            {categoryData.icon}
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                            <span className={`px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold`}>
                                {categoryData.title}
                            </span>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        {/* Title */}
                        <h3 className="text-2xl font-serif text-white leading-tight group-hover:text-white/90 transition-colors line-clamp-2">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-white/60 leading-relaxed line-clamp-3">
                            {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div className="flex items-center gap-4 text-white/50 text-sm">
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </time>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="text-white/70 group-hover:text-white"
                            >
                                <ArrowUpRight className="w-5 h-5" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Accent line */}
                    <div className={`h-1 bg-gradient-to-r ${categoryData.borderGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </div>
            </motion.article>
        </Link>
    );
}
