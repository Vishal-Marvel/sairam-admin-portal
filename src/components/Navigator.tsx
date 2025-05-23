import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/context/SessionContext";
import NavLinks from "./NavLinks";
import MobileToggle from "./MobileToggle";

export interface LinkType {
  name: string;
  path?: string;
  subpaths?: LinkType[];
  isVisible?: boolean;
}

const getLinks = (token: string | null): LinkType[] => [
  { name: "home", path: "/", isVisible: true },
  { name: "survey report", path: "/report", isVisible: !!token },
  { name: "survey analysis", path: "/analysis", isVisible: !!token },
  {
    name: "schemes",
    subpaths: [
      { name: "state schemes", path: "/schemes/stateSchemes" },
      { name: "central schemes", path: "/schemes/centralSchemes" },
    ],
    isVisible: !!token,
  },
  { name: "login", path: "/login", isVisible: !token },
  { name: "logout", path: "/logout", isVisible: !!token },
];

export const Navigator = ({ fixed }: { fixed: boolean }) => {
  const { token } = useSession();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("home");
  const links = getLinks(token);

  useEffect(() => {
    const found = links.find((link) => link.path === location.pathname);
    setActiveLink(found?.name || "home");
  }, [location.pathname, links]);

  return (
    <div
      className={cn(
        "relative p-2 bg-indigo-950 transition-all duration-100",
        fixed && "fixed top-0 left-0 right-0 z-20 h-13"
      )}
    >
      <Link to="/">
        <img
          src="/uba-logo.webp"
          alt="UBA Logo"
          className={cn(
            "w-10 h-10 rounded-full absolute md:left-5 right-5 md:right-0 top-1/2 -translate-y-1/2",
            !fixed && "hidden"
          )}
        />
      </Link>

      <NavLinks links={links} />

      <div className="md:hidden flex items-center gap-5 p-2">
        <MobileToggle links={links} activeLink={activeLink} />
        <span className="font-bold text-white justify-center uppercase">
          {activeLink}
        </span>
      </div>
    </div>
  );
};
