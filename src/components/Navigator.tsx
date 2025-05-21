import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MobileToggle from "./MobileToggle";
import { useSession } from "@/providers/context/SessionContext";

interface Link {
  name: string;
  path: string;
  isVisible: boolean;
}

export const Navigator = ({ fixed }: { fixed: boolean }) => {
  const [activeLink, setActiveLink] = useState("/");
  const { token } = useSession();
  const location = useLocation();
  // Define an array of link labels
  const links: Link[] = [
    { name: "home", path: "/", isVisible: true },
    { name: "survey report", path: "/report", isVisible: token !== null },
    { name: "survey analysis", path: "/analysis", isVisible: token !== null },
    { name: "state schemes", path: "/stateSchemes", isVisible: token !== null },
    {
      name: "central schemes",
      path: "/centralSchemes",
      isVisible: token !== null,
    },
    { name: "login", path: "/login", isVisible: token == null },
    { name: "logout", path: "/logout", isVisible: token !== null },
  ];
  useEffect(() => {
    setActiveLink(
      links.find((link) => link.path === location.pathname)?.name || "home"
    );
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "relative p-2 bg-indigo-950 transition-all duration-100 ",
        fixed && " fixed top-0 left-0 right-0 z-20 h-13"
      )}
    >
      <Link to="/">
        <img
          src="/uba-logo.webp"
          alt="UBA Logo"
          className={cn(
            "abolute md:left-5 right-5 md:right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full",
            fixed ? "absolute" : "hidden"
          )}
        />
      </Link>
      <div
        className={
          "hidden h-full md:flex justify-end xl:space-x-[5rem] md:space-x-5 px-5 items-center text-white"
        }
      >
        {links
          .filter((link) => link.isVisible)
          .map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => {
                return cn(
                  "  hover:underline uppercase",
                  isActive && "font-bold"
                );
              }}
            >
              {link.name}
            </NavLink>
          ))}
      </div>
      <div className={"md:hidden flex items-center gap-5 p-2"}>
        <MobileToggle links={links} activeLink={activeLink} />
        <span className={`font-bold text-white justify-center uppercase`}>
          {activeLink}
        </span>
      </div>
    </div>
  );
};
