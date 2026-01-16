import Navbar from "@/components/Navbar";

export default function TravelPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <div className="pt-32 px-4 md:px-8 max-w-[1800px] mx-auto">
                <h1 className="text-[8vw] font-serif text-white mb-12">Travel</h1>
                <p className="text-white/60 text-xl max-w-2xl font-sans">
                    Exploring the world through a lens. From the Highlands to the Pacific.
                    (Dummy Page Content)
                </p>
            </div>
        </main>
    );
}
