import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const MessageSection = () => {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create(".first-message", {
      type: "words",
    });
    const secMsgSplit = SplitText.create(".second-message", {
      type: "words",
    });
    const paragraphSplit = SplitText.create(".message-content p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    // ─── Word-by-word color reveal scrub ───────────────────────────────
    // Chug-SPYLT: deliberate read-reveal, triggers late so words light up
    // as they're squarely in the reader's view (start 80%, end 55% center)
    gsap.to(firstMsgSplit.words, {
      color: "#ece8e1",
      ease: "none",
      stagger: 0.5,
      scrollTrigger: {
        trigger: ".first-message",
        start: "top 80%",
        end: "bottom 45%",
        scrub: 1.5,
      },
    });

    gsap.to(secMsgSplit.words, {
      color: "#ece8e1",
      ease: "none",
      stagger: 0.5,
      scrollTrigger: {
        trigger: ".second-message",
        start: "top 80%",
        end: "bottom 45%",
        scrub: 1.5,
      },
    });

    // ─── Pill banner wipe — Chug-SPYLT's left-to-right circ.inOut ──────
    gsap.timeline({
      scrollTrigger: {
        trigger: ".msg-text-scroll",
        start: "top 72%",
        toggleActions: "play none none reverse",
      },
    }).to(".msg-text-scroll", {
      duration: 1.2,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.inOut",
    });

    // ─── Paragraph word entrance — tight stagger like Chug-SPYLT ───────
    gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content p",
        start: "top 75%",
      },
    }).from(paragraphSplit.words, {
      yPercent: 300,
      rotate: 3,
      ease: "power3.out",
      duration: 1,
      stagger: 0.012,
    });
  });

  return (
    <section className="message-content">
      <div className="container mx-auto flex-center py-28 relative">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message">Hide as anything. Become the room.</h1>

            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="msg-text-scroll"
            >
              <div className="bg-[#2a1e18] md:pb-5 pb-3 px-5">
                <h2 className="text-[#a89070]">In Plain Sight</h2>
              </div>
            </div>

            <h1 className="second-message">
              But your voice betrays you every time.
            </h1>
          </div>

          <div className="flex-center md:mt-20 mt-10">
            <div className="max-w-md px-10 flex-center overflow-hidden">
              <p>
                Use your real microphone to impersonate any prop in the room —
                but every sound you make could reveal the truth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
