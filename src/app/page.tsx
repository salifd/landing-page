import Header from "@/components/Header";
import FirstSection from "@/components/FirstSection";
import MarqueeSection from "@/components/MarqueeSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecondSection from "@/components/SecondSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000d2e]">
      <Header />
      <main id="main-content">
        <FirstSection />
        <MarqueeSection />
        <FeaturesSection />
        <SecondSection />
      </main>
      <Footer />
    </div>
  );
}
