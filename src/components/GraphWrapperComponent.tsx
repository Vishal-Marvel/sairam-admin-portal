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

interface GraphWrapperComponentProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  footer?: string;
  width?: string;
}
const GraphWrapperComponent = (props: GraphWrapperComponentProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className={cn(" m-3  w-full", props.width || "md:w-[35rem]")}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="capitalize">{props.title}</span>
          <ExpandedGraph
            open={open}
            onClose={setOpen}
            title={props.title}
            content={props.children}
          />
        </CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      <CardFooter>{props.footer}</CardFooter>
    </Card>
  );
};

export default GraphWrapperComponent;
