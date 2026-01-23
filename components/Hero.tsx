"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const FRAME_COUNT = 120; // 0 to 119

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise((resolve) => {
                    const img = new Image();
                    // Pad with 4 zeros: 0000.png, 0001.png, etc.
                    const src = `/sequence/${i.toString().padStart(4, "0")}.png`;
                    img.src = src;
                    img.onload = () => resolve(img);
                    loadedImages[i] = img;
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        const render = () => {
            const progress = currentIndex.get();
            const index = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.floor(progress))
            );

            const img = images[index];
            if (img) {
                const { width: cw, height: ch } = canvas;
                const { width: iw, height: ih } = img;

                const scale = Math.max(cw / iw, ch / ih) * 1.15; // Zoom 15% to crop watermark aggressively
                const x = (cw - iw * scale) / 2;
                const y = (ch - ih * scale) / 2;

                ctx.drawImage(img, x, y, iw * scale, ih * scale);
            }
            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", updateSize);
            cancelAnimationFrame(animationId);
        };
    }, [images, currentIndex]);

    return (
        <div ref={containerRef} className="relative h-[200vh] w-full bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="h-full w-full object-cover"
                />

                {/* Overlay Layers */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {/* 0-15% Text */}
                    <SceneText progress={currentIndex} start={0} end={20} className="items-center justify-center">
                        <div className="text-center px-4">
                            <h1 className="font-serif text-6xl md:text-9xl font-bold tracking-tight text-white mb-4">Building Intelligence.</h1>
                            <p className="font-sans text-xl md:text-2xl text-white/80">AI/ML Engineer & Data Scientist</p>
                        </div>
                    </SceneText>

                    {/* 30-45% Text */}
                    <SceneText progress={currentIndex} start={35} end={55} className="items-end justify-start p-8 md:p-24">
                        <h2 className="font-sans text-5xl md:text-8xl font-bold text-white leading-tight max-w-4xl">
                            From <span className="text-lime-400">Data Pipelines</span>...
                        </h2>
                    </SceneText>

                    {/* 60-75% Text */}
                    <SceneText progress={currentIndex} start={70} end={90} className="items-end justify-end p-8 md:p-24">
                        <h2 className="font-sans text-5xl md:text-8xl font-bold text-white leading-tight text-right max-w-4xl">
                            ...to <span className="text-purple-400">Intelligent Systems.</span>
                        </h2>
                    </SceneText>
                </div>

                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background text-foreground z-50">
                        <p className="animate-pulse font-serif text-2xl">Loading Experience...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function SceneText({
    children,
    progress,
    start,
    end,
    className
}: {
    children: React.ReactNode,
    progress: MotionValue<number>,
    start: number,
    end: number,
    className?: string
}) {
    const opacity = useTransform(progress, [start, start + 5, end - 5, end], [0, 1, 1, 0]);
    const y = useTransform(progress, [start, end], [50, -50]);

    return (
        <motion.div
            style={{ opacity, y }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={clsx("absolute inset-0 flex", className)}
        >
            {children}
        </motion.div>
    );
}
