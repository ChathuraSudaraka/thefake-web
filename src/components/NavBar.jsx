const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 md:p-9 p-5">
      <span
        className="font-sans font-bold uppercase tracking-[-.04em] md:text-2xl text-xl text-milk leading-none"
        style={{ letterSpacing: "-0.04em" }}
      >
        The Fake
      </span>
    </nav>
  );
};

export default NavBar;
