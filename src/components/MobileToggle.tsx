import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
interface LinkType {
  name: string;
  path?: string;
  subpaths?: LinkType[];
  isVisible: boolean;
}
interface MobileToggleProps {
  links: LinkType[];
  activeLink: string;
}

const MobileToggle = (props: MobileToggleProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="" asChild>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>
            <span className="text-center text-3xl font-bold text-amber-600">
              UNNAT BHARAT ABHIYAN
            </span>
          </SheetTitle>

          <div
            className={
              "flex flex-col gap-5 justify-around flex-wrap items-center "
            }
          >
            {props.links
              .filter((link) => link.isVisible)
              .map((link) =>
                link.subpaths ? (
                  <div key={link.name} className="relative group inline-block">
                    <span className="cursor-pointer uppercase hover:underline font-medium">
                      {link.name}
                    </span>
                    <div className="absolute left-0 mt-1 hidden min-w-max flex-col bg-white shadow-md group-hover:flex z-50 border rounded-md">
                      {link.subpaths
                        .filter((sub) => sub.isVisible)
                        .map((sub) => (
                          <NavLink
                            key={sub.name}
                            to={sub.path ?? "/"}
                            className={({ isActive }) =>
                              cn(
                                "px-4 py-2 hover:bg-gray-100 text-sm uppercase",
                                isActive && "font-bold"
                              )
                            }
                          >
                            {sub.name}
                          </NavLink>
                        ))}
                    </div>
                  </div>
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
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;
