import { cn } from "@/lib/utils";
import { useLoader } from "@/hooks/use-loader";
import { Loader2 } from "lucide-react";

export const LoaderModal = () => {
  const { isOpen } = useLoader();

  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full z-50 flex items-center justify-center backdrop-brightness-50 backdrop-blur-sm",
        !isOpen && "hidden"
      )}
    >
      <div className="relative flex items-center justify-center">
        <img
          src="/uba-logo.webp"
          alt="Logo"
          width={125}
          height={125}
          className="aspect-square rounded-full animate-pulse z-10"
        />
        <Loader2
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin h-56 w-56 z-0 text-amber-500"
          strokeWidth={0.8}
        />
      </div>
    </div>
  );
};
