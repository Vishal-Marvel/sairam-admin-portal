import { DataTableFacetedFilter } from "@/components/ui/data-table/data-faceted-filter";
import { capitalize } from "@/lib/utils";
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
            label: capitalize(value[0]),
          }))}
        />
      )}
      {table.getColumn("gram_panchayat_name") && (
        <DataTableFacetedFilter
          column={table.getColumn("gram_panchayat_name")}
          title="Gram Panchayat Name"
          options={Array.from(
            table.getColumn("gram_panchayat_name")?.getFacetedUniqueValues() ??
              []
          ).map((value) => ({
            value: value[0],
            label: capitalize(value[0]),
          }))}
        />
      )}
      {table.getColumn("has_ration_card") && (
        <DataTableFacetedFilter
          column={table.getColumn("has_ration_card")}
          title="Has Ration Card"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          valueMapper={(val) => (val === "Yes" ? true : false)}
        />
      )}

      {table.getColumn("no_of_members_without_aadhaar") && (
        <DataTableFacetedFilter
          column={table.getColumn("no_of_members_without_aadhaar")}
          title="# Without Aadhaar"
          options={Array.from(
            table
              .getColumn("no_of_members_without_aadhaar")
              ?.getFacetedUniqueValues() ?? []
          )
            .sort((a, b) => Number(a[0]) - Number(b[0])) // optional: sort numerically
            .map((value) => ({
              value: value[0],
              label: String(value[0]),
            }))}
        />
      )}
    </>
  );
}

export default SurveyToolBar;
