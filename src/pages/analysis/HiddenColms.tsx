import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HiddenColmsProps {
  title: string;
  handleHide?: (title: string) => void;
}

const HiddenColms = ({ title, handleHide }: HiddenColmsProps) => (
  <Card className={cn("m-3 md:w-[20rem] w-full")}>
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span className="capitalize">{title}</span>
        {handleHide && (
          <Button onClick={() => handleHide(title)} variant="outline" className="flex gap-2 items-center">
            <span className="hidden md:block">Show</span>
            <PlusCircle />
          </Button>
        )}
      </CardTitle>
    </CardHeader>
  </Card>
);

export default HiddenColms;
