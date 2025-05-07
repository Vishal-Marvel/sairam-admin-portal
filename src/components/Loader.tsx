import { cn } from "@/lib/utils";

import { useLoader } from "@/hooks/use-loader";
import { Loader2 } from "lucide-react";

export const LoaderModal = () => {
  const { isOpen } = useLoader();
  // const isModalOpen = true;

  return (
    <div
      className={cn(
        " fixed top-0 left-0 w-full h-full backdrop-brightness-50 backdrop-blur-sm justify-center align-middle items-center z-50",
        isOpen ? "block" : "hidden"
      )}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex-grow w-full h-full">
          <img
            src={"/uba-logo.webp"}
            alt="Logo"
            width={125} // Adjust width and height if needed
            height={125}
            className="aspect-square z-10 rounded-full animate-pulse"
          />
          {/* <Image
            src={logo2}
            alt="TriboPlanet Logo"
            height={100}
            width={125}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          /> */}
          <Loader2
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin h-56 w-56 z-0 text-amber-500"
            strokeWidth={0.8}
          />
        </div>
      </div>
    </div>
  );
};
