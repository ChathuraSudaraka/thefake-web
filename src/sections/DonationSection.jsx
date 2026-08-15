import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useState, useRef } from "react";

const tiers = [
  { amount: "$5",  label: "Prop Fund",    desc: "Adds 10 hauntable objects to the map." },
  { amount: "$10", label: "Voice Node",   desc: "Runs proximity chat servers for one month." },
  { amount: "$25", label: "Hunter Pack",  desc: "Exclusive skin + permanent Discord role." },
  { isCustom: true, label: "Custom Tier", desc: "Choose your own support amount." },
];

const DonationSection = () => {
  const [active, setActive]           = useState(1);
  const [customAmount, setCustomAmount] = useState("50");
  const cardsRef                       = useRef([]);

  useGSAP(() => {
    const titleSplit = SplitText.create(".donate-title", { type: "chars" });
    const paragraphSplit = SplitText.create(".donate-paragraph", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    // ─── Entrance — Chug-SPYLT overlapping sequence ────────────────────
    const entryTl = gsap.timeline({
      scrollTrigger: { trigger: ".donate-section", start: "top 60%" },
    });

    entryTl
      .from(titleSplit.chars, {
        yPercent: 100,
        stagger: 0.018,
        ease: "power3.out",
        duration: 0.9,
      })
      .to(
        ".donate-wipe",
        {
          duration: 1.1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        paragraphSplit.words,
        {
          yPercent: 300,
          rotate: 3,
          ease: "power3.out",
          duration: 1,
          stagger: 0.012,
        },
        "-=0.6"
      );

    // ─── Cards bounce entrance — back.out(3) matches Chug-SPYLT energy ─
    gsap.fromTo(
      ".donate-card",
      { y: 90, scale: 0.8, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.09,
        duration: 1,
        ease: "back.out(3)",
        scrollTrigger: {
          trigger: ".donate-cards-grid",
          start: "top 80%",
        },
      }
    );

    // ─── Scroll parallax on grid (subtle float) ─────────────────────────
    gsap.timeline({
      scrollTrigger: {
        trigger: ".donate-cards-grid",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    }).to(".donate-cards-grid", { yPercent: -8, ease: "none" });

    // ─── Kinetic bg text — wider range than before ─────────────────────
    gsap.timeline({
      scrollTrigger: {
        trigger: ".donate-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    })
      .to(".donate-bg-text-1", { xPercent:  55, ease: "none" }, 0)
      .to(".donate-bg-text-2", { xPercent: -45, ease: "none" }, 0);
  });

  // ─── Click: compress → spring out (back.out feel) ──────────────────
  const handleCardClick = (index) => {
    setActive(index);
    const card = cardsRef.current[index];
    if (card) {
      gsap.timeline()
        .to(card, { scale: 0.94, duration: 0.1,  ease: "power2.in",  force3D: true })
        .to(card, { scale: 1.04, duration: 0.5,  ease: "back.out(3)", force3D: true })
        .to(card, { scale: 1,    duration: 0.25, ease: "power2.out", force3D: true });
    }
  };

  const handleCardMouseEnter = (index) => {
    gsap.to(cardsRef.current[index], {
      scale: 1.03,
      duration: 0.45,
      ease: "power3.out",
      force3D: true,
      overwrite: "auto",
    });
  };

  const handleCardMouseLeave = (index) => {
    gsap.to(cardsRef.current[index], {
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
      force3D: true,
      overwrite: "auto",
    });
  };

  return (
    <section className="donate-section" id="donate">
      <div className="donate-bg-texts">
        <h1 className="donate-bg-text-1">BACK THE GAME</h1>
        <h1 className="donate-bg-text-2">STAY INDEPENDENT</h1>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="donate-layout">

          {/* Left — title */}
          <div className="donate-left">
            <div className="overflow-hidden">
              <h1 className="donate-title">Support</h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="donate-title">The Dev</h1>
            </div>

            <div
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              className="donate-wipe"
            >
              <div className="bg-[#2a1e18] pb-4 md:pt-0 pt-2 px-5">
                <h2 className="text-[#a89070]">One Time · No Account</h2>
              </div>
            </div>

            <div className="overflow-hidden md:mt-12 mt-8 max-w-xs">
              <p className="donate-paragraph font-paragraph text-[#a89070] text-base leading-relaxed">
                Every dollar goes directly into props, voice servers, and keeping The Fake 100% indie.
              </p>
            </div>
          </div>

          {/* Right — 2×2 card grid */}
          <div className="donate-cards-grid">
            {tiers.map((tier, i) => {
              const isActive = active === i;
              return (
                <div
                  key={i}
                  ref={(el) => (cardsRef.current[i] = el)}
                  onClick={() => handleCardClick(i)}
                  onMouseEnter={() => handleCardMouseEnter(i)}
                  onMouseLeave={() => handleCardMouseLeave(i)}
                  className={`donate-card ${isActive ? "is-active" : ""}`}
                >
                  <div className="donate-card-top">
                    <span className="donate-card-tag font-paragraph text-[11px] uppercase tracking-[.25em] text-[#8c7d75]">
                      Tier {String(i + 1).padStart(2, "0")}
                    </span>

                    {tier.isCustom ? (
                      <div
                        className="donate-custom-wrapper"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-[#a89070] font-sans font-bold text-xl mr-1">$</span>
                        <input
                          type="number"
                          min="1"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="donate-custom-input font-sans font-bold text-milk text-2xl md:text-3xl"
                          placeholder="50"
                        />
                      </div>
                    ) : (
                      <span className="donate-card-amount font-sans font-bold text-milk">
                        {tier.amount}
                      </span>
                    )}
                  </div>

                  <div className="donate-card-bottom">
                    <h3 className="donate-card-label font-sans font-bold uppercase text-milk tracking-tight">
                      {tier.label}
                    </h3>
                    <p className="donate-card-desc font-paragraph text-[#8c7d75] text-xs leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default DonationSection;
