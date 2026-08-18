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

// Match Chug-SPYLT: prevent laggy trigger mis-fires
ScrollTrigger.config({ limitCallbacks: true });

const App = () => {
  useEffect(() => {
    // Refresh after all assets (fonts, videos) have painted
    const onLoad = () => {
      ScrollTrigger.refresh();
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    // ─── Smooth inertia scroll engine ───────────────────────────────────
    // ease 0.1 matches Chug-SPYLT's ScrollSmoother smooth:1 momentum feel
    let currentY = window.scrollY;
    let targetY  = window.scrollY;
    const ease   = 0.1;

    const onWheel = (e) => {
      if (e.target.closest("input, textarea, select, iframe, .paypal-buttons")) return;
      e.preventDefault();
      targetY += e.deltaY * 0.9;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(targetY, maxScroll));
    };

    // If the user grabs the scrollbar or uses touch — snap to real position
    const onScroll = () => {
      if (Math.abs(window.scrollY - currentY) > 60) {
        targetY  = window.scrollY;
        currentY = window.scrollY;
      }
    };

    const updateScroll = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.05) {
        currentY += diff * ease;
        window.scrollTo(0, currentY);
        ScrollTrigger.update();
      }
    };

    window.addEventListener("wheel",  onWheel,  { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true  });
    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0); // match Chug-SPYLT: no lag compensation warping

    return () => {
      window.removeEventListener("load",   onLoad);
      window.removeEventListener("wheel",  onWheel);
      window.removeEventListener("scroll", onScroll);
      gsap.ticker.remove(updateScroll);
    };
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
