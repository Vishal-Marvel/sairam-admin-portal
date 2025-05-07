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

interface GraphWrapperComponentProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  footer?: string;
}
const GraphWrapperComponent = (props: GraphWrapperComponentProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="w-[35rem] m-3">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{props.title}</span>
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
