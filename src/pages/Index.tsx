
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import InteractiveAssistant from "@/components/InteractiveAssistant";
import ResultsSection from "@/components/ResultsSection";
import ComparisonSection from "@/components/ComparisonSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <InteractiveAssistant />
        <ResultsSection />
        <ComparisonSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
