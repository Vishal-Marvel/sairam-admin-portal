import React from "react";
import { LinkType } from "./Navigator";
import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";
import { NavLink } from "react-router-dom";

type NavLinksProps = {
  links: LinkType[];
  mobile?: boolean;
  closeDrawer?: () => void;
};

const MobileSubpaths: React.FC<{
  subpaths: LinkType[];
  closeDrawer?: () => void;
}> = ({ subpaths, closeDrawer }) => (
  <div className="flex flex-row w-full justify-center gap-2">
    {subpaths.map((sub) => (
      <NavLink
        key={sub.name}
        to={sub.path ?? "/"}
        onClick={closeDrawer}
        className={({ isActive }) =>
          cn(
            "px-4 py-2 hover:underline text-sm uppercase text-center",
            isActive && "font-bold"
          )
        }
      >
        {sub.name}
      </NavLink>
    ))}
  </div>
);

const DesktopSubpaths: React.FC<{
  link: LinkType;
}> = ({ link }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className="px-4 py-2 hover:underline uppercase">
        {link.name}
      </TooltipTrigger>
      <TooltipContent
        className="flex flex-col items-center"
        side="bottom"
        align="center"
      >
        {link.subpaths?.map((sub) => (
          <NavLink
            key={sub.name}
            to={sub.path ?? "/"}
            className={({ isActive }) =>
              cn(
                "px-4 py-2 hover:underline text-sm uppercase",
                isActive && "font-bold"
              )
            }
          >
            {sub.name}
          </NavLink>
        ))}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const NavLinks: React.FC<NavLinksProps> = ({
  links,
  mobile = false,
  closeDrawer,
}) => {
  const containerClass = mobile
    ? "flex flex-col gap-1 justify-center items-center"
    : "hidden md:flex justify-end xl:space-x-[1rem] md:space-x-5 px-5 items-center text-white";

  return (
    <div className={cn(containerClass)}>
      {links
        .filter((link) => link.isVisible)
        .map((link) =>
          link.subpaths ? (
            mobile ? (
              <MobileSubpaths
                key={link.name}
                subpaths={link.subpaths}
                closeDrawer={closeDrawer}
              />
            ) : (
              <DesktopSubpaths key={link.name} link={link} />
            )
          ) : (
            <NavLink
              key={link.name}
              to={link.path ?? "/"}
              onClick={closeDrawer}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 hover:underline uppercase",
                  isActive && "font-bold"
                )
              }
            >
              {link.name}
            </NavLink>
          )
        )}
    </div>
  );
};

export default NavLinks;
