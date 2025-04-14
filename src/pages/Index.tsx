
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StepByStepFinder from "@/components/StepByStepFinder";
import ResultsSection from "@/components/ResultsSection";
import ComparisonSection from "@/components/ComparisonSection";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "react-error-boundary";

// Simple fallback component for any errors in the page
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-background p-4">
    <div className="max-w-md w-full glass-card p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-ubike mb-4">Algo salió mal</h2>
      <p className="text-muted-foreground mb-4">Estamos trabajando para resolverlo lo antes posible.</p>
      <button 
        className="bg-ubike hover:bg-ubike/90 text-white px-4 py-2 rounded"
        onClick={() => window.location.reload()}
      >
        Reintentar
      </button>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Navbar />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <StepByStepFinder />
          <ResultsSection />
          <ComparisonSection />
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default Index;
