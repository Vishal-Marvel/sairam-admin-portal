import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ExpandedGraph from "./ExpandedGraph";
import { cn } from "@/lib/utils";
import { Expand, MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";

interface GraphWrapperComponentProps {
  title: string;
  children: React.ReactNode;
  description?: string;

  width?: string;
  handleHide?: (title: string) => void;
}
const GraphWrapperComponent = (props: GraphWrapperComponentProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className={cn("m-3 w-full", props.width || "md:w-[35rem]")}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="capitalize">{props.title}</span>
          <div className="flex gap-2">
            <ExpandedGraph
              open={open}
              onClose={setOpen}
              title={props.title}
              content={props.children}
            />

            {props.handleHide && (
              <Button
                onClick={() => props.handleHide?.(props.title)}
                variant={"outline"}
              >
                <span className="md:block hidden">Hide</span>
                <MinusCircle />
              </Button>
            )}
          </div>
        </CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default GraphWrapperComponent;
