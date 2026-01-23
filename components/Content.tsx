"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useRef } from "react";
import clsx from "clsx";

export default function Content() {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="bg-background relative z-20 overflow-hidden">

            {/* Section 1: Travel (The Grid) */}
            <section id="travel" className="min-h-screen py-32 px-4 md:px-8 max-w-[1800px] mx-auto">
                <RevealText className="text-[12vw] leading-[0.9] font-serif text-white mb-24 md:mb-32 tracking-tight">
                    Travel & Life
                </RevealText>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 auto-rows-[600px]">
                    {/* Large Featured Item */}
                    <div className="md:col-span-2 relative group overflow-hidden rounded-sm">
                        <ParallaxImage
                            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2674&auto=format&fit=crop"
                            alt="Mist"
                            className="h-[120%]"
                        />
                        <div className="absolute bottom-0 left-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-white font-serif text-3xl">Highlands</span>
                        </div>
                    </div>

                    {/* Staggered Vertical Item */}
                    <div className="md:col-span-1 relative group overflow-hidden rounded-sm md:mt-24">
                        <ParallaxImage
                            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1000&auto=format&fit=crop"
                            alt="Camping"
                            className="h-[120%]"
                        />
                    </div>

                    {/* Additional Bento Items */}
                    <div className="md:col-span-1 relative group overflow-hidden rounded-sm">
                        <ParallaxImage
                            src="https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1000&auto=format&fit=crop"
                            alt="Iceland"
                            className="h-[120%]"
                        />
                    </div>

                    <div className="md:col-span-2 relative group overflow-hidden rounded-sm md:-mt-24">
                        <ParallaxImage
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop"
                            alt="Beach"
                            className="h-[120%]"
                        />
                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-right">
                            <span className="text-white font-serif text-3xl">Pacific</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Market Today (Financial Data Vibe) */}
            <section id="market" className="py-32 px-4 md:px-8 max-w-[1800px] mx-auto min-h-[80vh] bg-[#0A0A0A] border-t border-white/10">
                <RevealText className="text-[12vw] leading-[0.9] font-serif text-white mb-12 tracking-tight">
                    Market Pulse
                </RevealText>
                <div className="mb-24 flex items-center gap-4 text-lime-400 font-mono text-sm uppercase tracking-widest">
                    <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                    Live Data Simulation
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Ticker Card 1 */}
                    <div className="border border-white/10 p-8 bg-black/40 hover:bg-white/5 transition-colors group">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-white/60 font-mono text-xl">NIFTY 50</h3>
                            <TrendingUp className="text-lime-400 w-6 h-6" />
                        </div>
                        <div className="text-5xl font-sans text-white font-bold mb-2 tabular-nums">
                            24,850.35
                        </div>
                        <div className="text-lime-400 font-mono text-sm">
                            +125.40 (0.51%)
                        </div>
                        <div className="mt-8 h-1 w-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-lime-400 w-[70%]" />
                        </div>
                    </div>

                    {/* Ticker Card 2 */}
                    <div className="border border-white/10 p-8 bg-black/40 hover:bg-white/5 transition-colors group">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-white/60 font-mono text-xl">INDIA VIX</h3>
                            <TrendingDown className="text-red-400 w-6 h-6" />
                        </div>
                        <div className="text-5xl font-sans text-white font-bold mb-2 tabular-nums">
                            12.45
                        </div>
                        <div className="text-red-400 font-mono text-sm">
                            -0.85 (-6.4%)
                        </div>
                        <div className="mt-8 h-1 w-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-red-400 w-[30%]" />
                        </div>
                    </div>

                    {/* Ticker Card 3 */}
                    <div className="border border-white/10 p-8 bg-black/40 hover:bg-white/5 transition-colors group">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-white/60 font-mono text-xl">BANK NIFTY</h3>
                            <TrendingUp className="text-lime-400 w-6 h-6" />
                        </div>
                        <div className="text-5xl font-sans text-white font-bold mb-2 tabular-nums">
                            52,100.00
                        </div>
                        <div className="text-lime-400 font-mono text-sm">
                            +340.00 (0.68%)
                        </div>
                        <div className="mt-8 h-1 w-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-lime-400 w-[60%]" />
                        </div>
                    </div>
                </div>

                <div className="mt-12 p-8 border border-white/10 bg-white/5 font-mono text-sm text-white/70">
                    <span className="text-purple-400">Analysis:</span> Market sentiment remains bullish as agentic AI adoption drives tech sector growth. Volatility (VIX) cooling off suggests stability in the upcoming expiry.
                </div>
            </section>

            {/* Footer */}
            <footer className="py-40 px-4 md:px-8 border-t border-white/10 mt-20">
                <div className="max-w-[1800px] mx-auto">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            className="text-[15vw] leading-[0.85] font-serif text-white tracking-tighter mix-blend-difference"
                        >
                            LET'S TALK
                        </motion.h1>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between mt-12 md:mt-24 text-lg md:text-xl font-sans text-white/60 uppercase tracking-widest">
                        <div className="flex gap-8 mb-8 md:mb-0">
                            <a href="https://www.linkedin.com/in/gokul-gj/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                            <a href="https://www.instagram.com/gokul_gj/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                        </div>
                        <div>
                            © {new Date().getFullYear()} Gokul GJ
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Helper: Parallax Image Component
function ParallaxImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Creates a parallax effect where the image moves slower than the container
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]); // Subtle zoom on scroll

    return (
        <div ref={ref} className="w-full h-full overflow-hidden">
            <motion.img
                src={src}
                alt={alt}
                style={{ y, scale }}
                className={clsx("w-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700", className)}
            />
        </div>
    );
}

// Helper: Text Splitting Reveal
function RevealText({ children, className }: { children: string, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
