import { DataTableFacetedFilter } from "@/components/ui/data-table/data-faceted-filter";
import { useSession } from "@/providers/context/SessionContext";
import { Table } from "@tanstack/react-table";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
function SurveyToolBar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <>
      
      {table.getColumn("village_name") && (
        <DataTableFacetedFilter
          column={table.getColumn("village_name")}
          title="Village Name"
          options={Array.from(
            table.getColumn("village_name")?.getFacetedUniqueValues() ?? []
          ).map((value) => ({
            value: value[0],
            label: value[0]?.charAt(0).toUpperCase() + value[0]?.slice(1),
          }))}
          
        />
      )}
      {/* {table.getColumn("days") && (
        <DataTableFacetedFilter
          column={table.getColumn("days")}
          title="No of Days"
          //@ts-ignore
          options={Array.from(
            table.getColumn("days").getFacetedUniqueValues()
          ).map((value) => ({ value: value[0], label: value[0] }))}
        />
      )}
      {(!isMentor || isHOD || isInternshipCoordinator) &&
        !isStudent &&
        table.getColumn("batch") && (
          <DataTableFacetedFilter
            column={table.getColumn("batch")}
            title="Batch"
            options={Array.from(
              table.getColumn("batch").getFacetedUniqueValues()
            ).map((value) => ({ value: value[0], label: value[0] }))}
          />
        )}
      {!isStudent && table.getColumn("sem") && (
        <DataTableFacetedFilter
          column={table.getColumn("sem")}
          title="SEM"
          options={Array.from(
            table.getColumn("sem").getFacetedUniqueValues()
          ).map((value) => ({
            value: value[0],
            label: value[0]?.toUpperCase(),
          }))}
        />
      )}

      {(isPrincipal || isCEO || isTapCell) && table.getColumn("department") && (
        <DataTableFacetedFilter
          column={table.getColumn("department")}
          title="Department"
          options={Array.from(
            table.getColumn("department").getFacetedUniqueValues()
          ).map((value) => ({
            value: value[0],
            label: value[0]?.toUpperCase(),
          }))}
        />
      )}
      {(!isMentor || isHOD || isInternshipCoordinator) &&
        !isStudent &&
        table.getColumn("section") && (
          <DataTableFacetedFilter
            column={table.getColumn("section")}
            title="Section"
            options={Array.from(
              table.getColumn("section").getFacetedUniqueValues()
            ).map((value) => ({ value: value[0], label: value[0] }))}
          />
        )} */}
    </>
  );
}

export default SurveyToolBar;
