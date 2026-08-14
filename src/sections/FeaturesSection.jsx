import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection";

const FeaturesSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
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
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
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
