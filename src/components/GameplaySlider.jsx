import { useGSAP } from "@gsap/react";
import { modelists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const GameplaySlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount + 1500}px`,
          scrub: 1.5,   // weighted — matches Chug-SPYLT's flavor slider feel
          pin: true,
        },
      });

      tl.to(".flavor-section", {
        x: `-${scrollAmount + 1500}px`,
        ease: "power2.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: 1.5,
      },
    });

    titleTl
      .to(".first-text-split",  { xPercent: -30, ease: "power2.inOut" })
      .to(".flavor-text-scroll",{ xPercent: -22, ease: "power2.inOut" }, "<")
      .to(".second-text-split", { xPercent: -10, ease: "power2.inOut" }, "<");
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
