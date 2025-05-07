import { ProblemStatements } from "@/schema";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProblemsProps {
  problems: ProblemStatements[];
}

const Problems = (props: ProblemsProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <span className="w-full text-2xl font-semibold">Problems Faced</span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Problem</TableHead>
            <TableHead>Suggestion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.problems.slice(0, 5).map((problem) => (
            <TableRow key={problem.problem}>
              <TableCell>{problem.problem}</TableCell>
              <TableCell>{problem.suggestion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Problems;
