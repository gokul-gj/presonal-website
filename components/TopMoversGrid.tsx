"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import type { StockMover } from "@/lib/marketData";
import { formatCurrency, formatPercentage } from "@/lib/marketData";

interface TopMoversGridProps {
    gainers: StockMover[];
    losers: StockMover[];
}

export default function TopMoversGrid({ gainers, losers }: TopMoversGridProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Gainers */}
            <MoversSection
                title="Top Gainers"
                icon={<TrendingUp className="w-6 h-6" />}
                stocks={gainers}
                type="gainer"
                gradient="from-green-500/20 to-emerald-500/20"
                accentColor="green"
            />

            {/* Top Losers */}
            <MoversSection
                title="Top Losers"
                icon={<TrendingDown className="w-6 h-6" />}
                stocks={losers}
                type="loser"
                gradient="from-red-500/20 to-rose-500/20"
                accentColor="red"
            />
        </div>
    );
}

interface MoversSectionProps {
    title: string;
    icon: React.ReactNode;
    stocks: StockMover[];
    type: "gainer" | "loser";
    gradient: string;
    accentColor: string;
}

function MoversSection({ title, icon, stocks, type, gradient, accentColor }: MoversSectionProps) {
    const isGainer = type === "gainer";
    const textColor = isGainer ? "text-green-400" : "text-red-400";
    const borderColor = isGainer ? "from-green-500 to-emerald-500" : "from-red-500 to-rose-500";

    return (
        <motion.div
            initial={{ opacity: 0, x: isGainer ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative"
        >
            {/* Glowing border */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${borderColor} rounded-2xl opacity-0 group-hover:opacity-50 blur transition duration-500`} />

            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />

                {/* Header */}
                <div className="relative z-10 flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} border border-white/20`}>
                        <div className={textColor}>{icon}</div>
                    </div>
                    <h3 className="text-2xl font-serif text-white">{title}</h3>
                </div>

                {/* Stock list */}
                <div className="relative z-10 space-y-3">
                    {stocks.map((stock, index) => (
                        <StockMoverCard
                            key={stock.symbol}
                            stock={stock}
                            index={index}
                            isGainer={isGainer}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

interface StockMoverCardProps {
    stock: StockMover;
    index: number;
    isGainer: boolean;
}

function StockMoverCard({ stock, index, isGainer }: StockMoverCardProps) {
    const changeColor = isGainer ? "text-green-400" : "text-red-400";
    const bgGradient = isGainer ? "from-green-500/10 to-emerald-500/10" : "from-red-500/10 to-rose-500/10";

    return (
        <motion.div
            initial={{ opacity: 0, x: isGainer ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: isGainer ? 5 : -5 }}
            className="group/card relative"
        >
            <div className={`absolute inset-0 bg-gradient-to-r ${bgGradient} rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300`} />

            <div className="relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors duration-300">
                <div className="flex items-center justify-between">
                    {/* Stock info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-white/40 text-sm font-mono w-6">#{index + 1}</span>
                            <div>
                                <h4 className="text-white font-semibold">{stock.symbol}</h4>
                                <p className="text-white/50 text-xs">{stock.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Price and change */}
                    <div className="text-right">
                        <div className="text-white font-bold text-lg mb-1">
                            {formatCurrency(stock.price)}
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                            <div className={`flex items-center gap-1 ${changeColor} font-semibold text-sm`}>
                                {isGainer ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                <span>{formatPercentage(Math.abs(stock.changePercent))}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Volume indicator */}
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                        <BarChart3 className="w-3 h-3" />
                        <span>Volume</span>
                    </div>
                    <span className="text-white/60 text-xs font-mono">
                        {(stock.volume / 1000000).toFixed(2)}M
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
