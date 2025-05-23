import React from "react";
import { LinkType } from "./Navigator";
import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip
} from "@/components/ui/tooltip";
import { NavLink } from "react-router-dom";

const NavLinks = ({ links }: { links: LinkType[] }) => {
  return (
    <>
      {links
        .filter((link) => link.isVisible)
        .map((link) =>
          link.subpaths ? (
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
                  {link.subpaths.map((sub) => (
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
          ) : (
            <NavLink
              key={link.name}
              to={link.path ?? "/"}
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
    </>
  );
};

export default NavLinks;
