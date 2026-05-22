import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import HeroMonitor from "./sections/HeroMonitor";
import HeroSection from "./sections/HeroSection";
import ProblemsSection from "./sections/ProblemsSection";
import DriverAppSection from "./sections/DriverAppSection";
import UseCasesSection from "./sections/UseCasesSection";
import LogisticsMap from "./sections/LogisticsMap";
import PartnersSection from "./sections/PartnersSection";
import OperationsFlowSection from "./sections/OperationsFlowSection";
import FeaturesSection from "./sections/FeaturesSection";
import CalculatorSection from "./sections/CalculatorSection";
import AdvantageSection from "./sections/AdvantageSection";
import TrustSection from "./sections/TrustSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <ProblemsSection />
        <DriverAppSection />
        <UseCasesSection />
        <HeroMonitor />
        <LogisticsMap />
        <PartnersSection />
        <OperationsFlowSection />
        <FeaturesSection />
        <CalculatorSection />
        <AdvantageSection />
        <TrustSection />
      </main>
      <SiteFooter />
    </div>
  );
}
