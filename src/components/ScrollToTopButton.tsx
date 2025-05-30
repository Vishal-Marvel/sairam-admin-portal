import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if (!scrollArea) return;

    const handleScroll = () => {
      setShowButton(scrollArea.scrollTop > 100);
    };

    scrollArea.addEventListener("scroll", handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => {
      scrollArea.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    document.getElementById("scroll-area")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showButton) return null;

  return (
    <Button
      variant="outline"
      className="fixed bottom-5 right-5 z-50 cursor-pointer transition-all hover:-translate-y-2 duration-150 ease-in shadow-2xl"
      onClick={handleClick}
    >
      <ChevronUp className="w-8 h-8" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
}
