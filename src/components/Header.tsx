import { Link } from "react-router-dom";
import { Navigator } from "./Navigator";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const [fixed, setFixed] = useState(false);
  const headerRef = useRef(null);

  const handleScroll = () => {
    const header = headerRef.current as HTMLElement | null;
    if (header) {
      if (window.scrollY >= header.offsetHeight + 10) {
        // Add a CSS class to apply styles for the fixed navbar
        setFixed(true);
      } else {
        // Remove the CSS class to restore default styles
        setFixed(false);
      }
    }
  };

  // Attach the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex flex-col">
      <div
        ref={headerRef}
        className=" flex md:flex-row flex-col p-2 m-2 justify-around items-center gap-5"
      >
        <Link to={"/"} className="hidden md:block">
          <img src="/uba-logo.webp" alt="UBA LOGO" />
        </Link>
        <div className="flex flex-col items-center justify-center gap-2">
          <Link
            to={"/"}
            className=" flex flex-row items-center justify-center h-full gap-2"
          >
            <img src="/sairam-logo.webp" alt="Sairam LOGO" className="w-36 md:w-full" />
            <span className=" px-[0.08rem] py-8 bg-amber-600 " />
            <img src="/chairman-logo.webp" alt="Sairam LOGO" className="w-16 md:w-18" />
          </Link>
          <span className="text-center md:text-3xl text-xl font-bold text-amber-600">
            UNNAT BHARAT ABHIYAN
          </span>
        </div>
        <img src="/emblem.webp" alt="UBA LOGO" className="hidden md:block"/>
        <div className="md:hidden flex justify-around items-center gap-5">
          <Link to={"/"}>
            <img src="/uba-logo.webp" alt="UBA LOGO" className="w-18 md:w-full" />
          </Link>
          <img src="/emblem.webp" alt="UBA LOGO"  className="w-18 md:w-full"/>
        </div>
      </div>

      <Navigator fixed={fixed} />
    </div>
  );
};

export default Header;
