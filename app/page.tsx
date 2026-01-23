import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import BentoGrid from "@/components/BentoGrid";
import SkillsShowcase from "@/components/SkillsShowcase";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="bg-black min-h-screen">
            <Navbar />
            <Hero />
            <BentoGrid />
            <SkillsShowcase />
            <AboutMe />
            <Footer />
        </main>
    );
}
