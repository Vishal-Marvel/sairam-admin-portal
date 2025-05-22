import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HiddenColmsProps {
  title: string;

  handleHide?: (title: string) => void;
}
const HiddenColms = (props: HiddenColmsProps) => {

  return (
    <Card className={cn("m-3 md:w-[20rem] w-full")}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="capitalize">{props.title}</span>
          <div className="flex gap-2">
            {props.handleHide && (
              <Button
                onClick={() => props.handleHide?.(props.title)}
                variant={"outline"}
              >
                <span className="md:block hidden">Show</span>
                <PlusCircle />
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default HiddenColms;
