"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";

const PHOTOS = [
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1000&auto=format&fit=crop", // Camping
    "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1000&auto=format&fit=crop", // Iceland
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop", // Night City
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop", // London
    "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1000&auto=format&fit=crop", // Northern Lights
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop", // Tokyo
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop", // NY
];

// CONFIG: The final position of the cards (The Mosaic)
const LAYOUT_CONFIG = [
    { x: -30, y: -25, rotate: -15, scale: 0.8, z: 1 },  // Top Left
    { x: 35, y: -20, rotate: 12, scale: 0.8, z: 2 },   // Top Right
    { x: -40, y: 5, rotate: -8, scale: 0.9, z: 3 },    // Mid Left
    { x: 40, y: 0, rotate: 8, scale: 0.9, z: 4 },      // Mid Right
    { x: -20, y: 30, rotate: -5, scale: 0.85, z: 5 },  // Bottom Left
    { x: 25, y: 35, rotate: 5, scale: 0.85, z: 6 },    // Bottom Right
    { x: 0, y: 0, rotate: 0, scale: 1.1, z: 10 },      // CENTER HERO
];

export default function TransitionSequence() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Keep container tall to control animation speed
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- ANIMATION SEQUENCE ---

    // 1. DROP IN (0% - 40%): 
    // Cards fall from Top (-120vh) to Center (0vh)
    const deckY = useTransform(scrollYProgress, [0, 0.4], ["-120vh", "0vh"]);

    // 2. BACKGROUND TEXT (Parallax)
    const textScale = useTransform(scrollYProgress, [0, 0.5], [1.5, 1]);
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

    // 3. EXIT (85% - 100%):
    // Everything scrolls up away naturally
    const exitY = useTransform(scrollYProgress, [0.85, 1], ["0vh", "-100vh"]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

                {/* LAYER 1: Background Watermark */}
                <motion.div
                    style={{ scale: textScale, opacity: textOpacity }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                >
                    <h1 className="font-serif text-[22vw] font-bold text-[#141414] tracking-tighter leading-none select-none">
                        GOKUL GJ
                    </h1>
                </motion.div>

                {/* LAYER 2: The Card Deck */}
                <motion.div
                    style={{ y: deckY }}
                    className="relative z-10 w-full h-full flex items-center justify-center perspective-[1000px]"
                >
                    <motion.div style={{ y: exitY }} className="relative w-full h-full flex items-center justify-center">

                        {PHOTOS.map((src, index) => {
                            const config = LAYOUT_CONFIG[index % LAYOUT_CONFIG.length];
                            return (
                                <Card
                                    key={index}
                                    src={src}
                                    index={index}
                                    config={config}
                                    scrollProgress={scrollYProgress}
                                />
                            );
                        })}

                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}

function Card({
    src,
    index,
    config,
    scrollProgress
}: {
    src: string,
    index: number,
    config: { x: number, y: number, rotate: number, scale: number, z: number },
    scrollProgress: MotionValue<number>
}) {
    // --- PHYSICS UPDATE ---

    // 1. SPREAD & SIZE (0% to 50%)
    // START: Large (Scale 2.5), Clumped (x:0, y:0)
    // END: Normal (config.scale), Spread (config.x)

    // Note the Range: [0, 0.5] means it happens AS they drop in.
    const x = useTransform(scrollProgress, [0, 0.5], ["0vw", `${config.x}vw`]);
    const y = useTransform(scrollProgress, [0, 0.5], ["0vh", `${config.y}vh`]);
    const scale = useTransform(scrollProgress, [0, 0.5], [2.5, config.scale]);

    // 2. ROTATION
    // Start straight or slight random, end at specific angle
    const rotate = useTransform(scrollProgress, [0, 0.5], [0, config.rotate]);

    return (
        <motion.div
            style={{ x, y, rotate, scale, zIndex: config.z }}
            className="absolute w-[30vw] md:w-[22vw] aspect-[3/4] shadow-2xl origin-center"
        >
            <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] group relative">
                <img
                    src={src}
                    alt="Travel"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-50" />
            </div>
        </motion.div>
    );
}