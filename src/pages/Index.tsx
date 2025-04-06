
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import InteractiveAssistant from "@/components/InteractiveAssistant";
import ResultsSection from "@/components/ResultsSection";
import ComparisonSection from "@/components/ComparisonSection";
import Footer from "@/components/Footer";
import { useState } from "react";

const Index = () => {
  const [showAssistant, setShowAssistant] = useState(false);

  const startAssistant = () => {
    setShowAssistant(true);
    setTimeout(() => {
      const assistantSection = document.getElementById('assistant');
      if (assistantSection) {
        assistantSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection onStartClick={startAssistant} />
        <HowItWorksSection />
        {showAssistant && <InteractiveAssistant />}
        <ResultsSection />
        <ComparisonSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
