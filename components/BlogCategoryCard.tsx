"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogCategoryCardProps {
    title: string;
    description: string;
    icon: string;
    gradient: string;
    borderGradient: string;
    href: string;
    count: number;
}

export default function BlogCategoryCard({
    title,
    description,
    icon,
    gradient,
    borderGradient,
    href,
    count
}: BlogCategoryCardProps) {
    return (
        <Link href={href}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full"
            >
                {/* Glowing border effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${borderGradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500`} />

                <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />

                    {/* Dot pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                            backgroundSize: '24px 24px'
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                        {/* Icon */}
                        <motion.div
                            className="text-7xl mb-6"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {icon}
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-4xl font-serif text-white mb-4 leading-tight">
                            {title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 text-lg mb-6 flex-grow">
                            {description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-white/60 text-sm font-medium">
                                {count} {count === 1 ? 'Article' : 'Articles'}
                            </span>
                            <motion.div
                                className="flex items-center gap-2 text-white group-hover:text-white/90"
                                whileHover={{ x: 5 }}
                            >
                                <span className="font-medium">Explore</span>
                                <ArrowRight className="w-5 h-5" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Floating orbs */}
                    <motion.div
                        className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-30`}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </motion.div>
        </Link>
    );
}
