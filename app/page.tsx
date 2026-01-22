import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import BentoGrid from "@/components/BentoGrid";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="bg-black min-h-screen">
            <Navbar />
            <Hero />
            <BentoGrid />
            <AboutMe />
            <Footer />
        </main>
    );
}
