import { useRef } from "react";
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CommunitySection = () => {
  const vdRef = useRef([]);

  useGSAP(() => {

    // ─── Kinetic bg title scrub — stronger range than before ───────────
    // Chug-SPYLT: first title shoots far right, last shoots far left
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "200% top",
        scrub: 1.5,
      },
    });

    tl.to(".testimonials-section .first-title",  { xPercent: 90,  ease: "none" })
      .to(".testimonials-section .sec-title",    { xPercent: 35,  ease: "none" }, "<")
      .to(".testimonials-section .third-title",  { xPercent: -65, ease: "none" }, "<");

    // ─── Card deck: scatter → settle ───────────────────────────────────
    // Chug-SPYLT pattern: cards rise from below with a slight scale pulse
    // and individual rotations so they look like a tossed deck settling
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "10% top",
        end: "200% top",
        scrub: 1.5,
        pin: true,
      },
    });

    // Set starting state: each card slightly more scaled down than before
    gsap.set(".vd-card", { scale: 0.85 });

    pinTl.fromTo(
      ".vd-card",
      {
        yPercent: 160,
        scale: 0.85,
        opacity: 0.3,
      },
      {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.18,
        ease: "power2.out",
      }
    );
  });

  const handlePlay = (index) => {
    vdRef.current[index]?.play();
  };

  const handlePause = (index) => {
    vdRef.current[index]?.pause();
  };

  return (
    <section className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-milk first-title">Community</h1>
        <h1 className="text-[#6b4c33] sec-title">Clips</h1>
        <h1 className="text-milk third-title">Live</h1>
      </div>

      <div className="pin-box">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`vd-card ${card.translation} ${card.rotation}`}
            onMouseEnter={() => handlePlay(index)}
            onMouseLeave={() => handlePause(index)}
          >
            <video
              ref={(el) => (vdRef.current[index] = el)}
              src={card.src}
              playsInline
              muted
              loop
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;
