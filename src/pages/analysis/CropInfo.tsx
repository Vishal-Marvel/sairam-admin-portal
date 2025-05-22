import CombinedChartComponent, {
  CombinedChartConfig,
} from "@/components/CombinedChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import { capitalize } from "@/lib/utils";
import { VillageAggregatedData } from "@/schema";
import React from "react";
import { Data } from "./Analysis";


const CropInfo = ({ data }: { data: Data }) => {
  const chartData = Object.entries(data).map(([crop, values]) => ({
    category: capitalize(crop),
    area: values.crop_area,
    productivity: values.crop_productivity,
  }));

  const chartConfig = {
    area: {
      label: "Area (acres)",
      color: "rgba(75, 192, 192, 0.6)",
      type: "bar",
      yAxisID: "y",
      order: 1,
    },
    productivity: {
      label: "Productivity (tons/acre)",
      color: "rgba(255, 99, 132, 1)",
      type: "line",
      yAxisID: "y1",
      order: 2,
    },
  } satisfies CombinedChartConfig;
  return (
    <GraphWrapperComponent title="Area vs Productivity" width="md:w-[50rem]">
      <CombinedChartComponent
        chartData={chartData}
        datakeys={["area", "productivity"]}
        chartConfig={chartConfig}
        XaxisdataKey="category"
      />
    </GraphWrapperComponent>
  );
};

export default CropInfo;
