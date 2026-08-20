import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

const HeroSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    // ─── Entrance timeline — identical to Chug-SPYLT ───────────────────
    const tl = gsap.timeline({ delay: 0.8 });

    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
    })
      .to(
        ".hero-text-scroll",
        {
          duration: 1.1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.6"
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.018,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.7"
      );

    // ─── Scroll tilt — Chug-SPYLT's card-fall pivot from bottom ────────
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: 1,           // weighted scrub — not instant
      },
    });

    heroTl.to(".hero-container", {
      rotate: 7,
      scale: 0.88,
      yPercent: 25,
      transformOrigin: "center bottom", // pivot from bottom edge like Chug-SPYLT
      ease: "none",
    });
  });

  return (
    <section className="bg-main-bg">
      <div className="hero-container">
        <video
          src={`${import.meta.env.BASE_URL}videos/hero-bg.mp4`}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0f0d0e] opacity-55 z-[1]" />

        <div className="hero-content opacity-0">
          <div className="overflow-hidden">
            <h1 className="hero-title"><span className="normal-case">TheFakes</span></h1>
          </div>
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1>Prop Hunt · Horror · Coop</h1>
            </div>
          </div>

          <h2>
            Ghosts hide as everyday objects. Hunters track by sound. Nothing is
            what it seems.
          </h2>

          <div className="flex items-center gap-4 md:mt-16 mt-10 flex-wrap justify-center">
            <div className="hero-button">
              <p>Wishlist on Steam</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const target = document.querySelector(".vd-pin-section");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="hero-secondary-button flex items-center gap-3 cursor-pointer"
            >
              <div className="size-8 rounded-full bg-white/10 flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}images/play.svg`}
                  alt=""
                  className="size-3.5 ml-0.5"
                />
              </div>
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
