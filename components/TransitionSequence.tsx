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

// Generate better dispersion positions for wider spread
const DISPERSION_POSITIONS = PHOTOS.map((_, i) => {
    const totalPhotos = PHOTOS.length;
    const centerIndex = (totalPhotos - 1) / 2;
    const distanceFromCenter = i - centerIndex;

    return {
        x: distanceFromCenter * 15,  // Horizontal spread: -45vw to 45vw
        y: ((i * 17) % 30) - 15,  // Vertical variation: -15vh to 15vh
        scale: 0.6 + ((i * 7) % 15) / 100  // Scale variation: 0.6 to 0.75
    };
});

export default function TransitionSequence() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Tall container for controlled scroll animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[500vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Background Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <h1 className="font-serif text-[20vw] font-bold text-[#0a0a0a] tracking-tighter leading-none select-none">
                        GOKUL GJ
                    </h1>
                </div>

                {/* Card Stack */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {PHOTOS.map((src, index) => (
                        <Card
                            key={index}
                            src={src}
                            index={index}
                            totalCards={PHOTOS.length}
                            scrollProgress={scrollYProgress}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

function Card({
    src,
    index,
    totalCards,
    scrollProgress
}: {
    src: string,
    index: number,
    totalCards: number,
    scrollProgress: MotionValue<number>
}) {
    const dispersionConfig = DISPERSION_POSITIONS[index];

    // ===== PHASE 1: BOTTOM START & UPWARD REVEAL (0.0 - 0.3) =====
    // Images start at bottom and move up while scaling
    const revealStart = 0.0;
    const revealEnd = 0.3;

    // Start from bottom, move to center
    const phase1Y = useTransform(
        scrollProgress,
        [revealStart, revealEnd],
        [40, 0]  // Start at 40vh below center (bottom), move to center
    );

    // Scale up as moving
    const phase1Scale = useTransform(
        scrollProgress,
        [revealStart, revealEnd],
        [0.4, 0.8]  // Grow from small to medium
    );

    // Opacity fade in
    const phase1Opacity = useTransform(
        scrollProgress,
        [revealStart, 0.15],
        [0.3, 1.0]
    );

    // ===== PHASE 2: FAN OUT & DISPERSE (0.3 - 0.55) =====
    // Images fan out horizontally and vertically while continuing to scale
    const phase2X = useTransform(
        scrollProgress,
        [0.3, 0.55],
        [0, dispersionConfig.x]
    );

    const phase2Y = useTransform(
        scrollProgress,
        [0.3, 0.55],
        [0, dispersionConfig.y]
    );

    const phase2Scale = useTransform(
        scrollProgress,
        [0.3, 0.55],
        [0.8, dispersionConfig.scale]
    );

    // ===== PHASE 3: UPWARD CONTINUE & REGROUP (0.55 - 0.75) =====
    // Move from scattered positions to horizontal row at TOP
    const rowSpacing = 90 / (totalCards + 1);  // Distribute across 90vw
    const rowX = (index + 1) * rowSpacing - 45;  // Center the row

    const phase3X = useTransform(
        scrollProgress,
        [0.55, 0.75],
        [dispersionConfig.x, rowX]
    );

    const phase3Y = useTransform(
        scrollProgress,
        [0.55, 0.75],
        [dispersionConfig.y, -30]  // Move to 30vh ABOVE center
    );

    const phase3Scale = useTransform(
        scrollProgress,
        [0.55, 0.75],
        [dispersionConfig.scale, 0.5]  // Shrink slightly
    );

    // ===== PHASE 4: SLIDE OUT & FADE (0.75 - 1.0) =====
    // Continue upward and fade out
    const phase4Y = useTransform(
        scrollProgress,
        [0.75, 1.0],
        [0, -50]  // Continue moving up
    );

    const phase4Opacity = useTransform(
        scrollProgress,
        [0.80, 1.0],
        [1, 0]  // Fade out
    );

    // ===== COMBINED TRANSFORMATIONS =====
    const x = useTransform(scrollProgress, (progress) => {
        if (progress < 0.3) return 0;  // Phase 1: centered
        if (progress < 0.55) return phase2X.get();  // Phase 2: fan out
        return phase3X.get();  // Phase 3 & 4: regrouped row
    });

    const y = useTransform(scrollProgress, (progress) => {
        if (progress < 0.3) return `${phase1Y.get()}vh`;  // Phase 1: bottom to center
        if (progress < 0.55) return `${phase2Y.get()}vh`;  // Phase 2: disperse
        if (progress < 0.75) return `${phase3Y.get()}vh`;  // Phase 3: move to top
        return `${phase3Y.get() + phase4Y.get()}vh`;  // Phase 4: continue up
    });

    const scale = useTransform(scrollProgress, (progress) => {
        if (progress < 0.3) return phase1Scale.get();  // Phase 1: scale up
        if (progress < 0.55) return phase2Scale.get();  // Phase 2: continue scaling
        return phase3Scale.get();  // Phase 3 & 4: final size
    });

    const opacity = useTransform(scrollProgress, (progress) => {
        if (progress < 0.3) return phase1Opacity.get();  // Phase 1: fade in
        if (progress < 0.80) return 1;  // Phase 2 & 3: fully visible
        return phase4Opacity.get();  // Phase 4: fade out
    });

    // Z-index: higher index images appear on top
    const zIndex = index;

    return (
        <motion.div
            style={{
                x,
                y,
                scale,
                opacity,
                zIndex
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute w-[28vw] md:w-[20vw] aspect-[3/4] shadow-2xl origin-center"
        >
            <div className="w-full h-full rounded-xl overflow-hidden border border-white/20 bg-[#0a0a0a] group relative">
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