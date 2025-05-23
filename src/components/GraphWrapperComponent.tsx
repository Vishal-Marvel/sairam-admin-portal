import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import ExpandedGraph from "./ExpandedGraph";
import { MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GraphWrapperComponentProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  width?: string;
  handleHide?: (title: string) => void;
}

const GraphWrapperComponent: React.FC<GraphWrapperComponentProps> = ({
  title,
  children,
  description,
  width,
  handleHide,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className={cn("m-3 w-full", width || "md:w-[35rem]")}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="capitalize">{title}</span>
          <div className="flex gap-2">
            <ExpandedGraph
              open={open}
              onClose={setOpen}
              title={title}
              content={children}
            />
            {handleHide && (
              <Button
                onClick={() => handleHide(title)}
                variant="outline"
              >
                <span className="md:block hidden">Hide</span>
                <MinusCircle />
              </Button>
            )}
          </div>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default GraphWrapperComponent;
