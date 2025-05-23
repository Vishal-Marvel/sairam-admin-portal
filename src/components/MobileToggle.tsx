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
import NavLinks from "./NavLinks";
interface LinkType {
  name: string;
  path?: string;
  subpaths?: LinkType[];
  isVisible?: boolean;
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
           <NavLinks links={props.links}/>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;
