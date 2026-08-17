import { useMediaQuery } from "react-responsive";
import { mechanicsList } from "../constants";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const MechanicsSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [lists, setLists] = useState(mechanicsList);

  useEffect(() => {
    if (isMobile) {
      setLists(mechanicsList.slice(0, 3));
    } else {
      setLists(mechanicsList);
    }
  }, [isMobile]);

  useGSAP(() => {
    const titleSplit = SplitText.create(".nutrition-title", {
      type: "chars",
    });
    const paragraphSplit = SplitText.create(".nutrition-section p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    // ─── Chug-SPYLT: title chars snap in from below ─────────────────────
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top 70%",
      },
    });
    contentTl
      .from(titleSplit.chars, {
        yPercent: 100,
        stagger: 0.018,
        ease: "power3.out",
        duration: 0.9,
      })
      .from(
        paragraphSplit.words,
        {
          yPercent: 300,
          rotate: 3,
          ease: "power3.out",
          duration: 1,
          stagger: 0.012,
        },
        "-=0.5"
      );

    // ─── Pill banner: left wipe with circ.inOut ─────────────────────────
    gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    }).to(".nutrition-text-scroll", {
      duration: 1.2,
      opacity: 1,
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
      ease: "circ.inOut",
    });
  });

  return (
    <section className="nutrition-section">
      {/* Sleek section transition divider */}
      <div className="w-full h-12 relative flex items-center justify-center overflow-hidden">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6b4c33]/40 to-transparent" />
        <div className="absolute size-2 bg-[#a89070] rotate-45 opacity-60 shadow-[0_0_8px_#a89070]" />
      </div>

      <img
        src={`${import.meta.env.BASE_URL}images/big-img.png`}
        alt=""
        className="big-img"
      />

      <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-0 relative z-10">
        <div className="relative inline-block md:translate-y-20">
          <div className="general-title relative flex flex-col justify-center items-center gap-24">
            <div className="overflow-hidden place-self-start">
              <h1 className="nutrition-title">Dead Simple</h1>
            </div>
            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="nutrition-text-scroll place-self-start"
            >
              <div className="bg-[#2a1e18] pb-5 md:pt-0 pt-3 md:px-5 px-3">
                <h2 className="text-[#a89070]">Rules</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:justify-center items-center translate-y-5">
          <div className="md:max-w-xs max-w-md">
            <p className="text-lg md:text-right text-balance font-paragraph text-[#a89070]">
              One haunted house. Real voices. Live or die by proximity chat.
            </p>
          </div>
        </div>
      </div>

      <div className="nutrition-box">
        <div className="list-wrapper">
          {lists.map((mechanic, index) => (
            <div key={index} className="relative flex-1 col-center">
              <div>
                <p className="md:text-lg font-paragraph">{mechanic.label}</p>
                <p className="font-paragraph text-sm mt-2 opacity-50">count</p>
                <p className="text-2xl md:text-4xl tracking-tighter font-bold text-milk">
                  {mechanic.amount}
                </p>
              </div>

              {index !== lists.length - 1 && (
                <div className="spacer-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MechanicsSection;
