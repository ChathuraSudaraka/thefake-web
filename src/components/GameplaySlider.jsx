import { useGSAP } from "@gsap/react";
import { modelists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";

const GameplaySlider = () => {
  const sliderRef = useRef();

  useGSAP(() => {
    // ── Desktop horizontal pin ──────────────────────────────────────────
    // gsap.matchMedia properly kills & rebuilds triggers on resize.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      const getScrollAmount = () => {
        if (!sliderRef.current) return 2000;
        return sliderRef.current.scrollWidth - window.innerWidth;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: () => `+=${getScrollAmount() + 1500}px`,
          invalidateOnRefresh: true,
          scrub: 1.5,
          pin: true,
        },
      });

      tl.to(".flavor-section", {
        x: () => `-${getScrollAmount() + 1500}px`,
        ease: "power2.inOut",
        invalidateOnRefresh: true,
      });

      return () => tl.kill();
    });

    // ── Parallax title drift ─────────────────────────────────────────────
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    titleTl
      .to(".first-text-split",  { xPercent: -30, ease: "power2.inOut" })
      .to(".flavor-text-scroll",{ xPercent: -22, ease: "power2.inOut" }, "<")
      .to(".second-text-split", { xPercent: -10, ease: "power2.inOut" }, "<");

    return () => mm.revert();
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {modelists.map((mode) => (
          <div
            key={mode.name}
            className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${mode.rotation}`}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/${mode.color}-bg.svg`}
              alt=""
              className="absolute bottom-0 opacity-40"
            />

            <img
              src={`${import.meta.env.BASE_URL}images/${mode.color}-drink.webp`}
              alt=""
              className="drinks"
            />

            <img
              src={`${import.meta.env.BASE_URL}images/${mode.color}-elements.webp`}
              alt=""
              className="elements opacity-30"
            />

            {/* Mode tag */}
            <p className="absolute md:top-6 top-4 md:left-10 left-5 text-[#ece8e150] font-paragraph text-xs uppercase tracking-[.25em] font-medium">
              {mode.tag}
            </p>

            <h1>{mode.name}</h1>

            {/* Mode description */}
            <p className="absolute md:bottom-24 bottom-14 md:left-10 left-5 text-[#ece8e160] font-paragraph text-sm leading-snug max-w-[60%]">
              {mode.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameplaySlider;
