"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import type { IndexData } from "@/lib/marketData";
import { formatNumber, formatPercentage, getChangeColor, getChangeBgColor } from "@/lib/marketData";

interface MarketIndexCardProps {
    data: IndexData;
    featured?: boolean;
    index?: number;
}

export default function MarketIndexCard({ data, featured = false, index = 0 }: MarketIndexCardProps) {
    const isPositive = data.change >= 0;
    const changeColor = getChangeColor(data.change);
    const changeBgGradient = getChangeBgColor(data.change);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4, scale: featured ? 1.01 : 1.02 }}
            className={`group relative ${featured ? 'lg:col-span-2' : ''}`}
        >
            {/* Animated border glow */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${isPositive ? 'from-green-500 to-emerald-500' : 'from-red-500 to-rose-500'} rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500`} />

            <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${changeBgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />

                {/* Dot pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                    }}
                />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Activity className={`w-4 h-4 ${changeColor}`} />
                                <span className="text-white/60 text-sm font-medium">{data.symbol}</span>
                            </div>
                            <h3 className={`${featured ? 'text-2xl lg:text-3xl' : 'text-xl'} font-serif text-white leading-tight`}>
                                {data.name}
                            </h3>
                        </div>

                        {/* Live indicator */}
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-green-400 text-xs font-medium">LIVE</span>
                        </div>
                    </div>

                    {/* Main value */}
                    <motion.div
                        className={`${featured ? 'text-5xl lg:text-6xl' : 'text-4xl'} font-bold text-white mb-2`}
                        key={data.value}
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {formatNumber(data.value)}
                    </motion.div>

                    {/* Change indicator */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`flex items-center gap-1 ${changeColor} font-semibold text-lg`}>
                            {isPositive ? (
                                <TrendingUp className="w-5 h-5" />
                            ) : (
                                <TrendingDown className="w-5 h-5" />
                            )}
                            <span>{formatNumber(Math.abs(data.change))}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full ${changeColor} bg-white/10 backdrop-blur-sm text-sm font-bold`}>
                            {formatPercentage(data.changePercent)}
                        </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                        <div>
                            <div className="text-white/50 text-xs mb-1">High</div>
                            <div className="text-white font-semibold">{formatNumber(data.high)}</div>
                        </div>
                        <div>
                            <div className="text-white/50 text-xs mb-1">Low</div>
                            <div className="text-white font-semibold">{formatNumber(data.low)}</div>
                        </div>
                        <div>
                            <div className="text-white/50 text-xs mb-1">Open</div>
                            <div className="text-white font-semibold">{formatNumber(data.open)}</div>
                        </div>
                        <div>
                            <div className="text-white/50 text-xs mb-1">Prev Close</div>
                            <div className="text-white font-semibold">{formatNumber(data.prevClose)}</div>
                        </div>
                    </div>
                </div>

                {/* Floating orb */}
                <motion.div
                    className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${changeBgGradient} rounded-full blur-2xl opacity-20`}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </motion.div>
    );
}
