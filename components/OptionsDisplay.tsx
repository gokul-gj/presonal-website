"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TrendingUp, TrendingDown, BarChart2, Zap } from "lucide-react";
import type { OptionsChainData, OptionData } from "@/lib/marketData";
import { formatCurrency, formatNumber } from "@/lib/marketData";

interface OptionsDisplayProps {
    data: OptionsChainData;
}

export default function OptionsDisplay({ data }: OptionsDisplayProps) {
    const [selectedStrike, setSelectedStrike] = useState(data.atmStrike);
    const selectedOption = data.options.find(opt => opt.strikePrice === selectedStrike);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-3xl font-serif text-white mb-2">{data.underlying} Options</h3>
                    <div className="flex items-center gap-4">
                        <span className="text-white/60">Spot Price:</span>
                        <span className="text-2xl font-bold text-white">{formatNumber(data.spotPrice)}</span>
                        <span className="text-white/40">|</span>
                        <span className="text-white/60">ATM: {data.atmStrike}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">REAL-TIME</span>
                </div>
            </div>

            {/* Strike Selection */}
            <div className="flex gap-3 overflow-x-auto pb-2">
                {data.options.map((option, index) => {
                    const isATM = option.strikePrice === data.atmStrike;
                    const isSelected = option.strikePrice === selectedStrike;
                    const isITM = data.spotPrice > option.strikePrice;

                    return (
                        <motion.button
                            key={option.strikePrice}
                            onClick={() => setSelectedStrike(option.strikePrice)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                relative px-6 py-3 rounded-lg font-semibold whitespace-nowrap
                                transition-all duration-300
                                ${isSelected
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                                    : 'bg-white/5 text-white/80 hover:bg-white/10'
                                }
                                ${isATM && !isSelected ? 'border-2 border-yellow-400/50' : 'border border-white/10'}
                            `}
                        >
                            {option.strikePrice}
                            {isATM && (
                                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-yellow-400 text-black text-xs rounded-full font-bold">
                                    ATM
                                </span>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Options Chain Display */}
            <AnimatePresence mode="wait">
                {selectedOption && (
                    <motion.div
                        key={selectedStrike}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                        {/* Call Option */}
                        <OptionCard
                            type="CALL"
                            data={selectedOption.call}
                            strikePrice={selectedOption.strikePrice}
                        />

                        {/* Put Option */}
                        <OptionCard
                            type="PUT"
                            data={selectedOption.put}
                            strikePrice={selectedOption.strikePrice}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface OptionCardProps {
    type: "CALL" | "PUT";
    data: {
        premium: number;
        openInterest: number;
        volume: number;
        changeInOI: number;
        impliedVolatility: number;
        greeks: {
            delta: number;
            gamma: number;
            theta: number;
            vega: number;
        };
    };
    strikePrice: number;
}

function OptionCard({ type, data, strikePrice }: OptionCardProps) {
    const isCall = type === "CALL";
    const gradient = isCall ? "from-green-500/20 to-emerald-500/20" : "from-red-500/20 to-rose-500/20";
    const borderGradient = isCall ? "from-green-500 to-emerald-500" : "from-red-500 to-rose-500";
    const accentColor = isCall ? "text-green-400" : "text-red-400";
    const icon = isCall ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />;

    return (
        <div className="group relative">
            {/* Glowing border */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${borderGradient} rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500`} />

            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden">
                {/* Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30`} />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} border border-white/20 ${accentColor}`}>
                                {icon}
                            </div>
                            <div>
                                <h4 className={`text-2xl font-bold ${accentColor}`}>{type}</h4>
                                <p className="text-white/60 text-sm">Strike: {strikePrice}</p>
                            </div>
                        </div>
                    </div>

                    {/* Premium */}
                    <div className="mb-6">
                        <div className="text-white/60 text-sm mb-1">Premium</div>
                        <div className="text-4xl font-bold text-white">
                            {formatCurrency(data.premium)}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <StatItem
                            label="Open Interest"
                            value={(data.openInterest / 1000).toFixed(0) + "K"}
                        />
                        <StatItem
                            label="Volume"
                            value={(data.volume / 1000).toFixed(0) + "K"}
                        />
                        <StatItem
                            label="Change in OI"
                            value={(data.changeInOI >= 0 ? "+" : "") + (data.changeInOI / 1000).toFixed(0) + "K"}
                            colored={true}
                            isPositive={data.changeInOI >= 0}
                        />
                        <StatItem
                            label="IV"
                            value={data.impliedVolatility.toFixed(2) + "%"}
                        />
                    </div>

                    {/* Greeks */}
                    <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                            <BarChart2 className="w-4 h-4 text-white/60" />
                            <span className="text-white/80 font-semibold">Greeks</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <GreekItem label="Delta" value={data.greeks.delta} />
                            <GreekItem label="Gamma" value={data.greeks.gamma} />
                            <GreekItem label="Theta" value={data.greeks.theta} />
                            <GreekItem label="Vega" value={data.greeks.vega} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatItem({
    label,
    value,
    colored = false,
    isPositive = true
}: {
    label: string;
    value: string;
    colored?: boolean;
    isPositive?: boolean;
}) {
    return (
        <div>
            <div className="text-white/50 text-xs mb-1">{label}</div>
            <div className={`font-semibold ${colored ? (isPositive ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>
                {value}
            </div>
        </div>
    );
}

function GreekItem({ label, value }: { label: string; value: number }) {
    return (
        <div className="bg-white/5 rounded-lg p-2">
            <div className="text-white/50 text-xs mb-1">{label}</div>
            <div className="text-white font-mono font-semibold">
                {value >= 0 ? '+' : ''}{value.toFixed(4)}
            </div>
        </div>
    );
}
