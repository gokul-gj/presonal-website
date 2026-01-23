"use client";

import Navbar from "@/components/Navbar";
import TravelSection from "@/components/TravelSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TravelPage() {
    return (
        <main className="bg-black min-h-screen text-white selection:bg-purple-500/30">
            <Navbar />
            <div className="pt-20">
                <TravelSection />
            </div>
            <Footer />
        </main>
    );
}
