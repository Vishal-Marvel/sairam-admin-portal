import React from "react";
import { Expand } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface ExpandedGraphProps {
  open: boolean;
  title: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
}

const ExpandedGraph: React.FC<ExpandedGraphProps> = ({
  open,
  title,
  onClose,
  content,
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogTrigger asChild>
      <Button variant="outline">
        Expand <Expand />
      </Button>
    </DialogTrigger>
    <DialogContent className="md:min-w-[60rem]">
      <DialogHeader>
        <DialogTitle className="capitalize">{title}</DialogTitle>
      </DialogHeader>
      {content}
    </DialogContent>
  </Dialog>
);

export default ExpandedGraph;
