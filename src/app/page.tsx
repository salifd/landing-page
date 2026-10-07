import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Story from "@/components/Story";
import HowItWorks from "@/components/HowItWorks";
import Destinations from "@/components/Destinations";
import Features from "@/components/Features";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import MotionController from "@/components/MotionController";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <main>
        <Hero />
        <Ticker />
        <Story />
        <HowItWorks />
        <Destinations />
        <Features />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MotionController />
    </div>
  );
}
