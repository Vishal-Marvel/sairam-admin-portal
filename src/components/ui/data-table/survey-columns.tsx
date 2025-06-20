import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table/data-column-header";

import { SurveyRecord } from "@/schema";
import FamilyMembers from "@/pages/report/FamilyMembers";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../button";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const surveyColumns: ColumnDef<SurveyRecord>[] = [
  {
    id: "s_no",
    header: () => <div className="text-center font-medium">S. No</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    size: 50, // optional, controls column width
  },
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => {
      return <div className="text-center font-medium">ID</div>;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium ">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "schedule_filed_by",
    id: "schedule_filed_by",
    header: ({ column }) => {
      return <div className="text-center font-medium">Student Name</div>;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium ">
        {row.getValue("schedule_filed_by") || "N/A"}
        {" ("}
        {row.original.college_id || "N/A"}
        {")"}
      </div>
    ),
  },
  {
    accessorKey: "survey_date",
    id: "survey_date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Survey Date" />;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium ">
        {new Date(row.getValue("survey_date")).toLocaleDateString("en-GB")}
      </div>
    ),
  },
  {
    accessorKey: "village_name",
    id: "village_name",
    header: () => <div className="text-center font-medium">Village Name</div>,
    cell: ({ row, column }) => {
      const rawValue = String(row.getValue("village_name"));
      const villageName = rawValue.split("(")[0].trim();

      const selectedValues = new Set(
        (column.getFilterValue() as string[]) || []
      );

      const isSelected = selectedValues.has(rawValue);

      const toggleFilter = () => {
        if (isSelected) {
          selectedValues.delete(rawValue);
        } else {
          selectedValues.add(rawValue);
        }

        const newFilter = Array.from(selectedValues);
        column.setFilterValue(newFilter.length ? newFilter : undefined);
      };

      return (
        <div
          onClick={toggleFilter}
          className={cn(
            "text-center font-medium cursor-pointer transition",
            buttonVariants({ variant: "link" })
          )}
        >
          {villageName}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id)));
    },
  },
  {
    accessorKey: "gram_panchayat_name",
    id: "gram_panchayat_name",
    header: () => (
      <div className="text-center font-medium">Gram Panchayat Name</div>
    ),
    cell: ({ row, column }) => {
      const rawValue = String(row.getValue("gram_panchayat_name"));
      const selectedValues = new Set(
        (column.getFilterValue() as string[]) || []
      );

      const isSelected = selectedValues.has(rawValue);

      const toggleFilter = () => {
        if (isSelected) {
          selectedValues.delete(rawValue);
        } else {
          selectedValues.add(rawValue);
        }

        const newFilter = Array.from(selectedValues);
        column.setFilterValue(newFilter.length ? newFilter : undefined);
      };
      return (
        <div
          onClick={toggleFilter}
          className={cn(
            "w-full text-center font-medium cursor-pointer transition",
            buttonVariants({ variant: "link" })
          )}
        >
          {rawValue}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  // {
  //   accessorKey: "no_of_family_members",
  //   id: "no_of_family_members",
  //   header: ({ column }) => {
  //     return <div className="text-center font-medium"># of family members at home</div>
  //     // return (
  //     //   <DataTableColumnHeader column={column} title="# of family members at home" />
  //     // );
  //   },
  //   cell: ({ row }) => (
  //     <div className="flex items-center justify-center">
  //       {row.getValue("no_of_family_members")}

  //     </div>
  //   ),
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "no_of_family_members",
    id: "no_of_family_members_received",
    header: ({ column }) => {
      return (
        <div className="text-center font-medium"># of family members</div>
        // <DataTableColumnHeader column={column} title="# of family members info received" />
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <FamilyMembers
          value={row.original.family_info.length}
          members={row.original.family_info}
        />
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "has_ration_card",
    id: "has_ration_card",
    header: () => (
      <div className="text-center font-medium">Has Ration Card</div>
    ),
    cell: ({ row }) => {
      const value = row.getValue("has_ration_card");
      return (
        <div className="text-center font-medium">{value ? "Yes" : "No"}</div>
      );
    },
    filterFn: (row, id, value) => {
      const val = row.getValue(id) ? "Yes" : "No";
      return value.includes(val);
    },
  },
  {
    accessorKey: "no_of_members_without_aadhaar",
    id: "no_of_members_without_aadhaar",
    header: ({ column }) => {
      return (
        <div className="text-center font-medium"># of Without Aadhaar</div>
      );
    },
    cell: ({ row }) => {
      const value = Number(row.getValue("no_of_members_without_aadhaar"));
      const members = row.original.family_info.filter(
        (m) => m.aadhaar_status === "No"
      );
      return (
        <div className="text-center font-medium">
          {value > 0 ? (
            <FamilyMembers value={value} members={members} />
          ) : (
            value
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  // {
  //   accessorKey: "piped_water_at_home",

  //   header: () => (
  //     <div className="text-center font-medium">Piped Water At Home</div>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="text-center font-medium">
  //       {row.getValue("piped_water_at_home") ? "Yes" : "No"}
  //     </div>
  //   ),
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "govt_or_private_supply",

  //   header: () => (
  //     <div className="text-center font-medium">Govt Or Private Supply</div>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="text-center font-medium">
  //       {row.getValue("govt_or_private_supply") ? "Government" : "Private"}
  //     </div>
  //   ),
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "electricity_connection",
  //   header: () => {
  //     return <div className="text-center">Electricity Connection</div>;
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div className="text-center font-medium">
  //         {row.getValue("electricity_connection") ? "Yes" : "No"}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "starting_date",
  //   header: ({ column }) => {
  //     return <DataTableColumnHeader column={column} title="Starting Date" />;
  //   },
  //   cell: ({ row }) => (
  //     <div className="text-center font-medium ">
  //       {new Date(row.getValue("starting_date")).toLocaleDateString("en-GB")}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "ending_date",
  //   header: ({ column }) => {
  //     return <DataTableColumnHeader column={column} title="Ending Date" />;
  //   },
  //   cell: ({ row }) => (
  //     <div className="text-center font-medium">
  //       {new Date(row.getValue("ending_date")).toLocaleDateString("en-GB")}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "mode_of_intern",
  //   header: ({ column }) => {
  //     return <DataTableColumnHeader column={column} title="Mode" />;
  //   },
  //   cell: ({ row }) => (
  //     <div className="text-center font-medium">
  //       {
  //         //@ts-ignore
  //         row.getValue("mode_of_intern")?.charAt(0).toUpperCase() +
  //           //@ts-ignore
  //           row.getValue("mode_of_intern")?.slice(1)
  //       }
  //     </div>
  //   ),
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "no_of_days",
  //   id: "days",
  //   header: ({ column }) => {
  //     return <DataTableColumnHeader column={column} title="No Of Days" />;
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div className="items-center justify-center text-center">
  //         <span>{row.getValue("days")}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "approval_status",
  //   header: ({ column }) => {
  //     return <DataTableColumnHeader column={column} title="Approval Status" />;
  //   },
  //   cell: ({ row }) => {
  //     const status = approvalStatuses.find(
  //       (status) => status.value === row.getValue("approval_status")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="items-center flex">
  //         {status.icon && <status.icon className="mr-2 h-4 w-4 " />}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "internship_status",
  //   header: ({ column }) => {
  //     return (
  //       <DataTableColumnHeader column={column} title="Completion Status" />
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const status = internshipStatuses.find(
  //       (status) => status.value === row.getValue("internship_status")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="items-center flex">
  //         {status.icon && <status.icon className="mr-2 h-4 w-4 " />}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const internship = row.original;
  //     const { role } = useSession();
  //     const { onOpen } = useModal();
  //     const navigate = useNavigate();
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>

  //           <DropdownMenuItem
  //             className="cursor-pointer"
  //             onClick={() => {
  //               navigate("/internship/" + internship.id);
  //             }}
  //           >
  //             View Internship
  //           </DropdownMenuItem>
  //           {role?.includes("student") &&
  //             internship.approval_status == "Approved" &&
  //             !internship.certificate && (
  //               <DropdownMenuItem
  //                 className="cursor-pointer"
  //                 onClick={() => {
  //                   onOpen("completeInternship", { internship });
  //                 }}
  //               >
  //                 Upload Certificate
  //               </DropdownMenuItem>
  //             )}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
