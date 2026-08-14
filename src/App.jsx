import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import DonationSection from "./sections/DonationSection";
import MessageSection from "./sections/MessageSection";
import GameplaySection from "./sections/GameplaySection";
import MechanicsSection from "./sections/MechanicsSection";
import FeaturesSection from "./sections/FeaturesSection";
import CommunitySection from "./sections/CommunitySection";
import FooterSection from "./sections/FooterSection";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return (
    <main>
      <NavBar />
      <HeroSection />
      <DonationSection />
      <MessageSection />
      <GameplaySection />
      <MechanicsSection />
      <FeaturesSection />
      <CommunitySection />
      <FooterSection />
    </main>
  );
};

export default App;
