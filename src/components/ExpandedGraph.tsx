import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import React from "react";
import { Expand } from "lucide-react";

interface ExpandedGraphProps {
  open: boolean;
  title: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
}

const ExpandedGraph = (props: ExpandedGraphProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          Expand <Expand />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[60rem]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        {props.content}
      </DialogContent>
    </Dialog>
  );
};

export default ExpandedGraph;
