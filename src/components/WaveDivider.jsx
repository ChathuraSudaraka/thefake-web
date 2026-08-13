const WaveDivider = ({ topColor = "#0f0d0e", bottomColor = "#1a1412", flip = false }) => {
  return (
    <div
      className="w-full overflow-hidden leading-[0] block"
      style={{ backgroundColor: bottomColor, transform: flip ? "scaleY(-1)" : "none" }}
    >
      <svg
        viewBox="0 0 1440 130"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ display: "block" }}
      >
        {/* Top background fill */}
        <rect width="1440" height="130" fill={topColor} />
        {/* Wave shape — bottom section dripping down */}
        <path
          d="M0,30 
             C80,70 160,10 240,50 
             C320,90 400,20 480,55 
             C560,90 640,15 720,45 
             C800,75 880,10 960,50 
             C1040,90 1120,20 1200,55 
             C1280,90 1360,25 1440,45 
             L1440,130 L0,130 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
