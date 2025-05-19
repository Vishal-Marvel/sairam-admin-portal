import BarChartComponent from "@/components/BarChartComponent";
import CombinedChartComponent, {
  CombinedChartConfig,
} from "@/components/CombinedChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import PieChartComponent from "@/components/PieChart";
import { capitalize, generateChartConfig, getRandomColor, transformItem } from "@/lib/utils";
import {
  VillageAggregatedData,
  AvailableStatus,
  VillageWiseAnalyticalData,
} from "@/schema";
type Data = VillageAggregatedData[keyof VillageAggregatedData];

interface AnalysisProps {
  data: Data;
  fullData: VillageWiseAnalyticalData;
  village: string[];
  dataset: string;
}


const Analysis = ({ data, fullData, village, dataset }: AnalysisProps) => {
  if (dataset == "crop_info") {
    // console.log(data);
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
  }
  return (
    <>
      {Object.keys(data).map((key) => {
        let chartData = Object.keys(data[key as keyof Data]).map((item) =>
          transformItem(key as keyof Data, item, data)
        );
        const chartConfig = generateChartConfig(data[key as keyof Data]);

        const graph =
          chartData.length > 0 &&
          chartData.length <= 4 &&
          chartData.some((item) =>
            Object.prototype.hasOwnProperty.call(item, "value")
          );

        let hasData =
          chartData.length > 0 &&
          chartData.some((item) =>
            Object.values(item).some(
              (val) =>
                typeof val === "number" ||
                (typeof val === "object" &&
                  val !== null &&
                  Object.values(val).some(
                    (v) => typeof v === "number" && v > 0
                  ))
            )
          );
        if (!hasData && village.length != 1) {
          chartData = (village.length > 1 ? village : Object.keys(fullData))
            .map((villageName, index) => {
              const record = fullData[villageName];
              const value =
                record?.[dataset as keyof VillageAggregatedData]?.[
                  key as keyof Data
                ];
              //   if (!value) return null;

              const sum = typeof value === "number" ? value : -1;
              if (sum === -1) return null;

              return {
                category: capitalize(
                  villageName.split("(")[0].replace(/_/g, " ")
                ),
                value: sum,
                fill: getRandomColor(index),
                color: getRandomColor(index),
              };
            })
            .filter(Boolean) as typeof chartData;

          hasData = chartData.length > 0;
        }
        // console.log(data, chartData);

        return (
          <GraphWrapperComponent
            title={key.replace(/_/g, " ")}
            key={key}
            width={graph ? "w-[25rem]" : "w-[35rem]"}
          >
            {!hasData ? (
              <div className="grid place-content-center text-center text-gray-500 h-[15rem]">
                No Data Available
              </div>
            ) : graph ? (
              <PieChartComponent
                chartData={chartData}
                chartConfig={chartConfig}
                datakey={"value"}
                XaxisdataKey={"category"}
              />
            ) : (
              <BarChartComponent
                chartData={chartData}
                chartConfig={chartConfig}
                datakeys={
                  Object.keys(chartData[0] ?? {}).findIndex(
                    (key) => key == "value"
                  ) === -1
                    ? ["available", "not_available"]
                    : ["value"]
                }
                XaxisdataKey={"category"}
              />
            )}
          </GraphWrapperComponent>
        );
      })}
    </>
  );
};

export default Analysis;
