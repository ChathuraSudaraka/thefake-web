const NavBar = () => {
  const scrollToDonate = () => {
    document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 md:p-9 p-5 flex justify-between items-center pointer-events-none">
      <span
        className="font-sans font-bold uppercase tracking-[-.04em] md:text-2xl text-xl text-milk leading-none pointer-events-auto cursor-pointer"
        style={{ letterSpacing: "-0.04em" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        The Fake
      </span>

      <button
        onClick={scrollToDonate}
        className="pointer-events-auto bg-[#2a1e18] border border-[#0f0d0e] hover:bg-[#3d2820] text-milk font-sans font-bold uppercase md:text-sm text-xs tracking-wider md:px-6 px-4 md:py-2.5 py-2 rounded-full cursor-pointer transition-all duration-300 active:scale-95"
      >
        Donate
      </button>
    </nav>
  );
};

export default NavBar;
