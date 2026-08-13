import { useMediaQuery } from "react-responsive";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <section className="footer-section">
      <img
        src={`${import.meta.env.BASE_URL}images/footer-dip.png`}
        alt=""
        className="w-full object-cover -translate-y-1"
      />

      <div className="relative md:pt-[20vh] pt-[10vh] pb-10">
        <div className="overflow-hidden z-10">
          <h1 className="general-title text-center text-milk py-5">
            #STAYHIDDEN
          </h1>
        </div>

        {isMobile ? (
          <img
            src={`${import.meta.env.BASE_URL}images/footer-drink.png`}
            className="absolute top-0 object-contain opacity-15"
          />
        ) : (
          <video
            src={`${import.meta.env.BASE_URL}videos/splash.mp4`}
            autoPlay
            playsInline
            muted
            className="absolute top-0 object-contain mix-blend-lighten opacity-30"
          />
        )}

        <div className="flex-center gap-5 relative z-10 md:mt-20 mt-5">
          <div className="social-btn">
            <img src={`${import.meta.env.BASE_URL}images/yt.svg`} alt="YouTube" />
          </div>
          <div className="social-btn">
            <img src={`${import.meta.env.BASE_URL}images/insta.svg`} alt="Instagram" />
          </div>
          <div className="social-btn">
            <img src={`${import.meta.env.BASE_URL}images/tiktok.svg`} alt="TikTok" />
          </div>
        </div>

        <div className="mt-20 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium opacity-70">
          <div className="flex items-center md:gap-16 gap-5">
            <div>
              <p>Game Modes</p>
            </div>
            <div>
              <p>About</p>
              <p>Press Kit</p>
              <p>Community</p>
            </div>
            <div>
              <p>Discord</p>
              <p>Contact</p>
              <p>Lore</p>
            </div>
          </div>

          <div className="md:max-w-lg">
            <p>
              Get exclusive early access and stay informed about launch updates,
              events, and more.
            </p>
            <div className="flex justify-between items-center border-b border-[#ece8e120] py-5 md:mt-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full placeholder:font-sans placeholder:text-[#ece8e140]"
              />
              <img
                src={`${import.meta.env.BASE_URL}images/arrow.svg`}
                alt="arrow"
                className="opacity-60"
              />
            </div>
          </div>
        </div>

        <div className="copyright-box">
          <p>Copyright © {new Date().getFullYear()} The Fake — All Rights Reserved</p>
          <div className="flex items-center gap-7">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
