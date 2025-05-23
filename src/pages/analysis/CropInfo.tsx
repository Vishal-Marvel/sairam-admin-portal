import React from "react";
import CombinedChartComponent, { CombinedChartConfig } from "@/components/CombinedChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import { capitalize } from "@/lib/utils";
import { Data } from "./Analysis";

interface CropInfoProps {
  data: Data;
}

const chartConfig: CombinedChartConfig = {
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
};

const CropInfo: React.FC<CropInfoProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([crop, values]) => ({
    category: capitalize(crop),
    area: values.crop_area,
    productivity: values.crop_productivity,
  }));

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
