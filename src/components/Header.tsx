import { Link } from "react-router-dom";
import { useState, useRef, useEffect, type RefObject } from "react";
import { Navigator } from "./Navigator";

const LOGOS = {
  uba: "/uba-logo.webp",
  sairam: "/sairam-logo.webp",
  chairman: "/chairman-logo.webp",
  emblem: "/emblem.webp",
};

const Header = () => {
  const [fixed, setFixed] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    const handleScroll = () => {
      if (headerRef.current && scrollArea) {
        const scrollHeight = scrollArea.scrollTop;
        setFixed(scrollHeight >= headerRef.current.offsetHeight + 10);
      }
    };
    scrollArea?.addEventListener("scroll", handleScroll);
    return () => scrollArea?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      <div
        ref={headerRef}
        className="flex md:flex-row flex-col p-2 m-2 justify-around items-center gap-5"
      >
        {/* Desktop UBA Logo */}
        <Link to="/" className="hidden md:block">
          <img src={LOGOS.uba} alt="UBA LOGO" />
        </Link>

        {/* Center Section */}
        <div className="flex flex-col items-center justify-center gap-2">
          <Link to="/" className="flex flex-row items-center justify-center h-full gap-2">
            <img src={LOGOS.sairam} alt="Sairam LOGO" className="w-36 md:w-full" />
            <span className="px-[0.08rem] py-8 bg-amber-600" />
            <img src={LOGOS.chairman} alt="Chairman LOGO" className="w-16 md:w-18" />
          </Link>
          <span className="text-center md:text-3xl text-xl font-bold text-amber-600">
            UNNAT BHARAT ABHIYAN
          </span>
        </div>

        {/* Desktop Emblem */}
        <img src={LOGOS.emblem} alt="Emblem" className="hidden md:block" />

        {/* Mobile Logos */}
        <div className="md:hidden flex justify-around items-center gap-5">
          <Link to="/">
            <img src={LOGOS.uba} alt="UBA LOGO" className="w-18 md:w-full" />
          </Link>
          <img src={LOGOS.emblem} alt="Emblem" className="w-18 md:w-full" />
        </div>
      </div>
      <Navigator fixed={fixed} />
    </div>
  );
};

export default Header;
