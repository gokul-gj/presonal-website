"use client";

import Navbar from "@/components/Navbar";
import MarketIndexCard from "@/components/MarketIndexCard";
import TopMoversGrid from "@/components/TopMoversGrid";
import MultiIndexOptions from "@/components/MultiIndexOptions";
import { motion } from "framer-motion";
import { Activity, TrendingUp, RefreshCw } from "lucide-react";
import {
    mockIndicesData,
    mockTopGainers,
    mockTopLosers,
    mockOptionsData,
    mockBankNiftyOptionsData,
    mockFinServicesOptionsData
} from "@/lib/marketData";
import { useMarketData, useTopMovers } from "@/lib/marketApi";

export default function MarketPage() {
    // Use auto-refresh hook for live data (refreshes every hour)
    const { data: liveIndicesData, loading, error, lastUpdated, source, refetch } = useMarketData(3600000); // 1 hour

    // Use live data if available, otherwise fallback to mock data
    const indicesData = liveIndicesData || mockIndicesData;

    // Separate featured indices (Nifty 50, Bank Nifty) from others
    const featuredIndices = indicesData.slice(0, 2); // Nifty 50 and Bank Nifty
    const otherIndices = indicesData.slice(2); // Sensex, Smallcap, Midcap, VIX

    // Combine all options data for multi-index display
    const allOptionsData = [mockOptionsData, mockBankNiftyOptionsData, mockFinServicesOptionsData];

    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4 md:px-8 max-w-[1800px] mx-auto relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    {/* Title */}
                    <div className="flex items-center gap-4 mb-6">
                        <Activity className="w-12 h-12 text-green-400" />
                        <h1 className="text-[12vw] md:text-[10vw] lg:text-8xl font-serif text-white leading-none tracking-tight">
                            Market <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Today</span>
                        </h1>
                    </div>

                    {/* Live indicator with data source and refresh */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center gap-3 text-green-400 font-mono text-sm uppercase tracking-widest">
                            <span className={`w-3 h-3 rounded-full shadow-lg ${source === 'live' ? 'bg-green-400 animate-pulse shadow-green-400/50' : 'bg-yellow-400 animate-pulse shadow-yellow-400/50'}`} />
                            <span>{source === 'live' ? 'Live Data' : source === 'mixed' ? 'Mixed Data' : 'Demo Data'}</span>
                        </div>
                        <span className="text-white/40">|</span>
                        <span className="text-white/60 text-sm">
                            {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString('en-IN')}` : 'Loading...'}
                        </span>
                        <span className="text-white/40">|</span>
                        <button
                            onClick={refetch}
                            disabled={loading}
                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            <span className="text-sm">{loading ? 'Refreshing...' : 'Refresh'}</span>
                        </button>
                    </div>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed">
                        Real-time analysis of <span className="text-white font-semibold">Indian indices</span>,{" "}
                        <span className="text-white font-semibold">top movers</span>, and{" "}
                        <span className="text-white font-semibold">options insights</span>.
                    </p>
                </motion.div>
            </section>

            {/* Featured Indices - Nifty 50 & Bank Nifty */}
            <section className="py-12 px-4 md:px-8 max-w-[1800px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">
                        Major Indices
                    </h2>
                    <p className="text-white/60 text-lg">Primary market benchmarks</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {featuredIndices.map((index, i) => (
                        <MarketIndexCard
                            key={index.symbol}
                            data={index}
                            featured={true}
                            index={i}
                        />
                    ))}
                </div>
            </section>

            {/* Other Indices Grid */}
            <section className="py-12 px-4 md:px-8 max-w-[1800px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">
                        Other Indices
                    </h2>
                    <p className="text-white/60 text-lg">Broader market indicators</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {otherIndices.map((index, i) => (
                        <MarketIndexCard
                            key={index.symbol}
                            data={index}
                            featured={false}
                            index={i + 2}
                        />
                    ))}
                </div>
            </section>

            {/* Top Movers Section */}
            <section className="py-12 px-4 md:px-8 max-w-[1800px] mx-auto">
                <TopMoversSection />
            </section>

            {/* Options Section */}
            <section className="py-12 px-4 md:px-8 max-w-[1800px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">
                        Options Chain
                    </h2>
                    <p className="text-white/60 text-lg">
                        Live options data with Greeks for Nifty, Bank Nifty & Financial Services
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <MultiIndexOptions optionsData={allOptionsData} />
                </motion.div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 px-4 md:px-8 max-w-[1800px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                                backgroundSize: '32px 32px'
                            }}
                        />
                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                                Market data updates in real-time
                            </h3>
                            <p className="text-white/60 text-lg">
                                Powered by live market feeds for accurate trading decisions
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}

// Helper Component for Top Movers Section
function TopMoversSection() {
    const { data, loading } = useTopMovers();

    // Use mock data for skeleton or initial render if completely empty
    const gainers = data?.gainers || mockTopGainers; // Fallback to mock only if null, but loading state handles it
    const losers = data?.losers || mockTopLosers;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
            >
                <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-8 h-8 text-purple-400" />
                    <h2 className="text-4xl md:text-5xl font-serif text-white">
                        Top Movers
                    </h2>
                </div>
                <p className="text-white/60 text-lg">
                    Biggest gainers and losers from NIFTY 50 (Live)
                </p>
            </motion.div>

            {loading && !data ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
                    <div className="h-[400px] bg-white/5 rounded-2xl border border-white/10" />
                    <div className="h-[400px] bg-white/5 rounded-2xl border border-white/10" />
                </div>
            ) : (
                <TopMoversGrid gainers={gainers} losers={losers} />
            )}
        </>
    );
}
