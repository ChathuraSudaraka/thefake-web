import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection";

const FeaturesSection = () => {
  useGSAP(() => {
    // ─── Chug-SPYLT cascaded wipe: each title wipes in sequentially ────
    // as the user scrolls — not all at once. Uses scrub so it's scroll-
    // linked, and each title fills its allotted slice of scroll distance.
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 55%",
        end: "center center",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(
        ".benefit-section .second-title",
        {
          duration: 1,
          opacity: 1,
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.3"   // slight overlap — next wipe starts before current finishes
      )
      .to(
        ".benefit-section .third-title",
        {
          duration: 1,
          opacity: 1,
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.3"
      )
      .to(
        ".benefit-section .fourth-title",
        {
          duration: 1,
          opacity: 1,
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.3"
      );

    // ─── Intro paragraph wipe ───────────────────────────────────────────
    gsap.timeline({
      scrollTrigger: {
        trigger: ".benefit-section p:first-of-type",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }).from(".benefit-section > div > div > p:first-of-type", {
      yPercent: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  return (
    <section className="benefit-section">
      <div className="container mx-auto pt-20">
        <div className="col-center">
          <p>
            The power behind the fear: <br />
            What makes The Fake worth hiding for.
          </p>

          <div className="mt-20 col-center">
            <ClipPathTitle
              title={"Proximity Voice"}
              color={"#ece8e1"}
              bg={"#2a1e18"}
              className={"first-title"}
              borderColor={"#0d0b0c"}
            />
            <ClipPathTitle
              title={"Prop Physics"}
              color={"#0d0b0c"}
              bg={"#ece8e1"}
              className={"second-title"}
              borderColor={"#0d0b0c"}
            />
            <ClipPathTitle
              title={"Coop Hunters"}
              color={"#ece8e1"}
              bg={"#3d1a10"}
              className={"third-title"}
              borderColor={"#0d0b0c"}
            />
            <ClipPathTitle
              title={"Unreal Engine 5"}
              color={"#ece8e1"}
              bg={"#4a3425"}
              className={"fourth-title"}
              borderColor={"#0d0b0c"}
            />
          </div>

          <div className="md:mt-0 mt-10">
            <p>And much more ...</p>
          </div>
        </div>
      </div>

      <div className="relative overlay-box">
        <VideoPinSection />
      </div>
    </section>
  );
};

export default FeaturesSection;
