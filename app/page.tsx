import HeroSection from "./components/home/HeroSection";
import OperationsList from "./components/home/OperationsList";
import ConnectedWorkflow from "./components/home/ConnectedWorkflow";
import SoftwareViews from "./components/home/SoftwareViews";
import UserRoles from "./components/home/UserRoles";
import EthiopianContext from "./components/home/EthiopianContext";
import WhyChooseUs from "./components/home/WhyChooseUs";
import TransitionSteps from "./components/home/TransitionSteps";
import VideoAction from "./components/home/VideoAction";
import FAQ from "./components/home/FAQ";
import BottomCTA from "./components/home/BottomCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <OperationsList />
      <ConnectedWorkflow />
      <SoftwareViews />
      <UserRoles />
      <EthiopianContext />
      <WhyChooseUs />
      <TransitionSteps />
      <VideoAction />
      <FAQ />
      <BottomCTA />
    </div>
  );
}