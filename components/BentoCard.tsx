"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    gradient?: string;
    hover?: boolean;
}

export default function BentoCard({
    children,
    className,
    gradient,
    hover = true
}: BentoCardProps) {
    return (
        <motion.div
            className={clsx(
                "relative overflow-hidden rounded-2xl p-6",
                "glass", // Uses design token glassmorphism
                hover && "transition-all duration-300 hover:scale-[1.02]",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Gradient Overlay */}
            {gradient && (
                <div
                    className={clsx(
                        "absolute inset-0 opacity-20",
                        gradient
                    )}
                    style={{
                        background: gradient.startsWith('from-')
                            ? undefined
                            : gradient
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
