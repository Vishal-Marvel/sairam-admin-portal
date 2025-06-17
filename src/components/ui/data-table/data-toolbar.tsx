"use client";

import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { DataTableViewOptions } from "./data-view-options";
import SurveyToolBar from "./survey-toolbar";
import { DataTablePagination } from "./data-pagination";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-start justify-between gap-5">
      <div className="flex flex-col justify-between flex-1 gap-2">
        <div className="flex space-x-5">
          <Input
            placeholder="Search..."
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-8  bg-slate-300 shadow-inner"
          />
        </div>
        <div className={cn("flex flex-wrap gap-1")}>
          <SurveyToolBar table={table} />
          {isFiltered && (
            <Button
              variant="outline"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
          <DataTablePagination show={false} table={table} />
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
