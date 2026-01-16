import Hero from "@/components/Hero";
import Content from "@/components/Content";
import Navbar from "@/components/Navbar";
import TransitionSequence from "@/components/TransitionSequence";

export default function Home() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <Hero />
            <TransitionSequence />
            <Content />
        </main>
    );
}
