
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StepByStepFinder from "@/components/StepByStepFinder";
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
        <StepByStepFinder />
        <ResultsSection />
        <ComparisonSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
