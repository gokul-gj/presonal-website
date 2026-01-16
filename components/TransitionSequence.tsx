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

// This defines the "Final Mosaic" layout. 
// Instead of random math, we design exactly where each card lands.
const LAYOUT_CONFIG = [
    { x: -35, y: -25, rotate: -15, scale: 0.9 }, // Top Left
    { x: 35, y: -25, rotate: 15, scale: 0.9 },  // Top Right
    { x: -45, y: 10, rotate: -8, scale: 0.8 },  // Mid Left
    { x: 45, y: 10, rotate: 8, scale: 0.8 },   // Mid Right
    { x: -20, y: 35, rotate: -5, scale: 0.85 }, // Bottom Left
    { x: 20, y: 35, rotate: 5, scale: 0.85 },  // Bottom Right
    { x: 0, y: 0, rotate: 0, scale: 1.1 },     // CENTER HERO (Last image on top)
];

export default function TransitionSequence() {
    const containerRef = useRef<HTMLDivElement>(null);

    // We make the container tall (300vh) to allow for a long animation sequence
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- ANIMATION PHASES ---

    // 1. Text Animation (Parallax behind)
    const textScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // 2. The Deck Movement (The whole cluster moves from bottom to center)
    const deckY = useTransform(scrollYProgress, [0, 0.3], ["100vh", "0vh"]);

    // 3. The Exit (The whole cluster moves up out of view at the end)
    const exitY = useTransform(scrollYProgress, [0.85, 1], ["0vh", "-100vh"]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-[#050505]">
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
                {/* We wrap everything in motion.divs to handle the Enter and Exit phases */}
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
    config: { x: number, y: number, rotate: number, scale: number },
    scrollProgress: MotionValue<number>
}) {
    // --- INDIVIDUAL CARD PHYSICS ---

    // 1. SPREAD PHASE (0.3 to 0.7 scroll range)
    // Before 0.3: Cards are at x:0, y:0 (Stacked)
    // After 0.7: Cards are at their config.x, config.y (Mosaic)
    const x = useTransform(scrollProgress, [0.3, 0.7], ["0%", `${config.x}%`]);
    const y = useTransform(scrollProgress, [0.3, 0.7], ["0%", `${config.y}%`]);

    // 2. ROTATION PHASE
    // Start with a messy random pile rotation, end with the clean config rotation
    const randomStartRotate = (index % 2 === 0 ? 5 : -5) * (index + 1);
    const rotate = useTransform(scrollProgress, [0.3, 0.7], [randomStartRotate, config.rotate]);

    // 3. SCALE PHASE
    // Start smallish (deck size), expand to full config size
    const scale = useTransform(scrollProgress, [0.3, 0.7], [0.5, config.scale]);

    return (
        <motion.div
            style={{ x, y, rotate, scale, zIndex: index }}
            className="absolute w-[30vw] md:w-[20vw] aspect-[3/4] shadow-2xl origin-center"
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