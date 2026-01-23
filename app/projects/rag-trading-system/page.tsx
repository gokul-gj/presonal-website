"use client";

import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Activity, Brain, Shield, Terminal, Play, CheckCircle, AlertCircle, ShoppingCart, Settings, TrendingUp } from "lucide-react";
import clsx from "clsx";

interface AgentStep {
    id: number;
    agent: string;
    status: "pending" | "running" | "completed" | "error";
    message?: string;
}

interface ExecutionLeg {
    type: "BUY" | "SELL";
    instrument: "CE" | "PE";
    strike: number;
    qty: number;
    premium?: number;
}

export default function RAGTradingPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [steps, setSteps] = useState<AgentStep[]>([]);
    const [marketData, setMarketData] = useState<any>(null);
    const [finalDecision, setFinalDecision] = useState<any>(null);
    const [riskAnalysis, setRiskAnalysis] = useState<any>(null);
    const [payoffData, setPayoffData] = useState<any[]>([]);

    // User Controls
    const [strategyMode, setStrategyMode] = useState<"Auto" | "Short Strangle" | "Short Straddle" | "Iron Fly">("Auto");

    const runAgentSystem = async () => {
        setIsRunning(true);
        setSteps([]);
        setMarketData(null);
        setFinalDecision(null);
        setRiskAnalysis(null);
        setPayoffData([]);

        try {
            // Simulate initial "Connect" step
            setSteps([{ id: 0, agent: "System", status: "running", message: "Initializing agents..." }]);

            const response = await fetch('/api/projects/rag-trading/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ strategyOverride: strategyMode })
            });
            const result = await response.json();

            if (result.success) {
                const incomingSteps: AgentStep[] = result.steps;
                setMarketData(result.marketData);

                // Reveal steps one by one
                for (let i = 0; i < incomingSteps.length; i++) {
                    await new Promise(resolve => setTimeout(resolve, 600));
                    setSteps(prev => {
                        const newSteps = [...prev];
                        if (newSteps.length > 0 && newSteps[newSteps.length - 1].agent === "System") {
                            newSteps.shift();
                        }
                        return [...newSteps, incomingSteps[i]];
                    });
                }

                await new Promise(resolve => setTimeout(resolve, 500));
                setFinalDecision(result.finalDecision);
                setRiskAnalysis(result.riskAnalysis);
                setPayoffData(result.payoffData);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setIsRunning(false);
        }
    };

    const handleExecute = () => {
        alert("This is a demo button. In production, this connects to the Zerodha Kite API.");
    };

    // Payoff Chart Helper
    const renderPayoffChart = () => {
        if (!payoffData.length) return null;

        const width = 100; // ViewBox units
        const height = 50;
        const minX = Math.min(...payoffData.map(d => d.x));
        const maxX = Math.max(...payoffData.map(d => d.x));
        const minY = Math.min(...payoffData.map(d => d.y), 0); // Ensure 0 is in view
        const maxY = Math.max(...payoffData.map(d => d.y));
        const yRange = maxY - minY || 1;
        const xRange = maxX - minX || 1;

        const points = payoffData.map(d => {
            const x = ((d.x - minX) / xRange) * width;
            const y = height - ((d.y - minY) / yRange) * height; // Invert Y for SVG
            return `${x},${y}`;
        }).join(" ");

        const zeroLineY = height - ((0 - minY) / yRange) * height;

        return (
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                {/* Zero Line */}
                <line x1="0" y1={zeroLineY} x2={width} y2={zeroLineY} stroke="white" strokeOpacity="0.2" strokeDasharray="4" strokeWidth="0.5" />

                {/* Area Gradient */}
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d={`M 0,${height} ${points} ${width},${height}`} fill="url(#chartGradient)" />
                <polyline points={points} fill="none" stroke="#4ade80" strokeWidth="1.5" />
            </svg>
        );
    };

    return (
        <main className="bg-background min-h-screen text-white font-sans selection:bg-green-500/30">
            <Navbar />

            <div className="pt-32 px-4 md:px-8 max-w-[1600px] mx-auto pb-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                                <Brain className="w-8 h-8 text-green-400" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif">RAG Agentic Trader</h1>
                        </div>
                        <p className="text-white/60 text-xl max-w-3xl">
                            An autonomous multi-agent system that scans the market, researches news using RAG, formulates strategies, and manages risk.
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="bg-white/5 border border-white/10 p-2 rounded-2xl flex items-center gap-2">
                        {["Auto", "Short Strangle", "Short Straddle", "Iron Fly"].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setStrategyMode(mode as any)}
                                className={clsx(
                                    "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                    strategyMode === mode ? "bg-white text-black shadow-lg" : "text-white/60 hover:text-white"
                                )}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Control & Status */}
                    <div className="lg:col-span-8 flex flex-col gap-8">

                        {/* Market Monitor */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <h3 className="text-2xl font-serif">Live Market Scanner</h3>
                                <button
                                    onClick={runAgentSystem}
                                    disabled={isRunning}
                                    className="flex items-center gap-2 px-6 py-2 rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isRunning ? <Activity className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                                    {isRunning ? "Running Agents..." : "Run Analysis"}
                                </button>
                            </div>

                            {marketData ? (
                                <div className="grid grid-cols-3 gap-4 relative z-10">
                                    <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                                        <div className="text-white/40 text-sm mb-1 uppercase tracking-widest">NIFTY 50</div>
                                        <div className="text-3xl font-mono">{marketData.spotPrice.toFixed(2)}</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                                        <div className="text-white/40 text-sm mb-1 uppercase tracking-widest">INDIA VIX</div>
                                        <div className={clsx("text-3xl font-mono", marketData.vix > 15 ? "text-red-400" : "text-green-400")}>
                                            {marketData.vix.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                                        <div className="text-white/40 text-sm mb-1 uppercase tracking-widest">Trend</div>
                                        <div className={clsx("text-3xl font-mono", marketData.trend === "BULLISH" ? "text-green-400" : "text-red-400")}>
                                            {marketData.trend}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-32 flex items-center justify-center text-white/20 border border-dashed border-white/10 rounded-xl">
                                    Click "Run Analysis" to start scanning
                                </div>
                            )}

                            {/* Bg Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
                        </motion.div>

                        {/* Agent Workflow Visualization */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-black/80 rounded-3xl border border-white/10 overflow-hidden font-mono text-sm min-h-[400px]"
                        >
                            <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-white/40" />
                                <span className="text-white/60">Agent Reasoning Log</span>
                            </div>
                            <div className="p-6 space-y-6">
                                <AnimatePresence>
                                    {steps.map((step) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex gap-4"
                                        >
                                            <div className="mt-1">
                                                {step.agent === "Market Scanner" && <Activity className="w-5 h-5 text-blue-400" />}
                                                {step.agent === "Market Researcher" && <Brain className="w-5 h-5 text-purple-400" />}
                                                {step.agent === "Strategist" && <CheckCircle className="w-5 h-5 text-green-400" />}
                                                {step.agent === "Risk Manager" && <Shield className="w-5 h-5 text-red-400" />}
                                            </div>
                                            <div>
                                                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">{step.agent}</div>
                                                <div className="text-white/90 leading-relaxed">{step.message}</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {steps.length === 0 && !isRunning && (
                                    <div className="text-white/20 italic">Waiting for command...</div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Execution */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Strategy Box */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 flex flex-col min-h-[500px]"
                        >
                            <h3 className="text-2xl font-serif mb-6">Strategy Decision</h3>

                            {finalDecision ? (
                                <div className="flex-1 flex flex-col">
                                    <div className="mb-6">
                                        <div className="text-white/40 text-sm mb-2 uppercase tracking-widest">Recommended Strategy</div>
                                        <div className="text-3xl font-mono text-green-400 font-bold">{finalDecision.strategy}</div>
                                    </div>

                                    {/* Risk Status */}
                                    {riskAnalysis && (
                                        <div className="mb-6 p-4 rounded-xl bg-black/20 border border-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-white/60">Risk Check</span>
                                                <span className={clsx("px-2 py-0.5 rounded text-xs font-bold", riskAnalysis.status === "PASS" ? "bg-green-500 text-black" : "bg-red-500 text-white")}>
                                                    {riskAnalysis.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-white/40 leading-relaxed">
                                                {riskAnalysis.details}
                                            </p>
                                        </div>
                                    )}

                                    {/* Payoff Chart */}
                                    <div className="mb-6 h-32 rounded-xl bg-black/20 border border-white/5 overflow-hidden p-2 relative">
                                        <div className="absolute top-2 left-2 text-[10px] text-white/20 z-10">PAYOFF DIAGRAM</div>
                                        {renderPayoffChart()}
                                    </div>

                                    <div className="space-y-2 mb-8">
                                        {finalDecision.legs.map((leg: ExecutionLeg, idx: number) => (
                                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5 text-sm">
                                                <div className="flex items-center gap-3">
                                                    <span className={clsx("px-2 py-1 rounded text-[10px] font-bold", leg.type === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
                                                        {leg.type}
                                                    </span>
                                                    <span className="font-mono">{leg.strike} {leg.instrument}</span>
                                                </div>
                                                <span className="text-white/40 text-xs">x{leg.qty}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-8 border-t border-white/10">
                                        <div className="flex items-center justify-between text-sm text-white/40 mb-4">
                                            <span>Margin</span>
                                            <span>~₹{(riskAnalysis?.margin || 125000).toLocaleString('en-IN')}</span>
                                        </div>
                                        <button
                                            onClick={handleExecute}
                                            className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                            Execute Trade
                                        </button>
                                        <p className="text-white/20 text-xs text-center mt-4">
                                            *Demo Mode: Connected to dummy execution engine
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-white/20 border-2 border-dashed border-white/5 rounded-2xl">
                                    <Activity className="w-12 h-12 mb-4 opacity-20" />
                                    <p>No strategy generated yet</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
