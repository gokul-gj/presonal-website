import Navbar from "@/components/Navbar";

export default function MarketPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <div className="pt-32 px-4 md:px-8 max-w-[1800px] mx-auto">
                <h1 className="text-[8vw] font-serif text-white mb-12">Market Today</h1>
                <div className="flex items-center gap-4 text-lime-400 font-mono text-sm uppercase tracking-widest mb-8">
                    <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                    Live Data Simulation
                </div>
                <p className="text-white/60 text-xl max-w-2xl font-sans">
                    Real-time analysis of NIFTY, VIX, and global sentiment.
                    (Dummy Page Content)
                </p>
            </div>
        </main>
    );
}
