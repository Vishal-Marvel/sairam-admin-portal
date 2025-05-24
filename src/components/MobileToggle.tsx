import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

const MobileToggle = ({ links }: MobileToggleProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className="text-white cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>
            <span className="block text-center text-3xl font-bold text-amber-600">
              UNNAT BHARAT ABHIYAN
            </span>
          </SheetTitle>
          <NavLinks links={links} mobile closeDrawer={() => setOpen(false)} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;
