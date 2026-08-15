import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const VideoPinSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    if (!isMobile) {
      // ─── Circle iris reveal — Chug-SPYLT cinematic feel ─────────────
      // scrub: 2 gives heavy weighted inertia during the iris open
      // power2.inOut eases in slow, punches out fast like a camera iris
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".vd-pin-section",
          start: "-15% top",
          end: "200% top",
          scrub: 2,
          pin: true,
        },
      });

      tl.to(".video-box", {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power2.inOut",
        duration: 1,
      });

      // ─── Spin circle accelerates as iris opens ───────────────────────
      // duration matches the scrub so the speed increase feels connected
      gsap.to(".spin-circle", {
        rotate: 720,           // double spin during the reveal
        ease: "none",
        scrollTrigger: {
          trigger: ".vd-pin-section",
          start: "-15% top",
          end: "200% top",
          scrub: 2,
        },
      });
    }
  });

  return (
    <section className="vd-pin-section">
      <div
        style={{
          clipPath: isMobile
            ? "circle(100% at 50% 50%)"
            : "circle(8% at 50% 50%)",
        }}
        className="size-full video-box"
      >
        <video
          src={`${import.meta.env.BASE_URL}videos/pin-video.mp4`}
          playsInline
          muted
          loop
          autoPlay
        />

        <div className="abs-center md:scale-100 scale-200">
          <img
            src={`${import.meta.env.BASE_URL}images/circle-text.svg`}
            alt=""
            className="spin-circle"
          />
          <div className="play-btn">
            <img
              src={`${import.meta.env.BASE_URL}images/play.svg`}
              alt=""
              className="2xl:size-[2.5vw] size-[3vw] ml-[.5vw]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;
