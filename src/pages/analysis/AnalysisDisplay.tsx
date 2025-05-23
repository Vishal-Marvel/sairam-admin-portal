import React, { useMemo } from "react";
import BarChartComponent from "@/components/BarChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import PieChartComponent from "@/components/PieChart";
import {
  capitalize,
  generateChartConfig,
  getRandomColor,
  transformItem,
} from "@/lib/utils";
import { VillageAggregatedData, VillageWiseAnalyticalData } from "@/schema";
import { Data } from "./Analysis";

interface AnalysisProps {
  data: Data;
  fullData: VillageWiseAnalyticalData;
  village: string[];
  dataset: string;
  toogleHiddenList: (title: string) => void;
  hiddenList: string[];
  hide?: boolean;
}

function getData(
  data: Data,
  key: keyof Data,
  fullData: VillageWiseAnalyticalData,
  village: string[],
  dataset: string
) {
  let chartData = Object.keys(data[key] ?? {}).map((item) =>
    transformItem(key, item, data)
  );
  const chartConfig = generateChartConfig(data[key]);
  const isPieChart =
    chartData.length > 0 &&
    chartData.length <= 4 &&
    chartData.some((item) => "value" in item);

  let hasData =
    chartData.length > 0 &&
    chartData.some((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "number" ||
          (typeof val === "object" &&
            val !== null &&
            Object.values(val).some((v) => typeof v === "number" && v > 0))
      )
    );

  if (!hasData && village.length !== 1) {
    chartData = (village.length > 1 ? village : Object.keys(fullData))
      .map((villageName, index) => {
        const record = fullData[villageName];
        const value = record?.[dataset as keyof VillageAggregatedData]?.[key];
        const sum = typeof value === "number" ? value : -1;
        if (sum === -1) return null;
        return {
          category: capitalize(villageName.split("(")[0].replace(/_/g, " ")),
          value: sum,
          fill: getRandomColor(index),
          color: getRandomColor(index),
        };
      })
      .filter(Boolean) as typeof chartData;
    hasData = chartData.length > 0;
  }
  return { chartData, chartConfig, isPieChart, hasData };
}

const AnalysisDisplay: React.FC<AnalysisProps> = ({
  data,
  fullData,
  village,
  dataset,
  toogleHiddenList,
  hiddenList,
  hide = true,
}) => {
  // Precompute chart data for all keys using useMemo outside the loop
  const chartDataMap = useMemo(() => {
    const result: Record<
      string,
      {
        chartData: any[];
        chartConfig: any;
        isPieChart: boolean;
        hasData: boolean;
      }
    > = {};
    Object.keys(data).forEach((key) => {
      result[key] = getData(data, key as keyof Data, fullData, village, dataset);
    });
    return result;
  }, [data, fullData, village, dataset]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-5">
      {Object.keys(data).map((key) => {
        const displayKey = key.replace(/_/g, " ");
        const { chartData, chartConfig, isPieChart, hasData } = chartDataMap[key];

        if (hide && hiddenList.includes(displayKey)) return null;

        return (
          <GraphWrapperComponent
            title={displayKey}
            key={key}
            handleHide={toogleHiddenList}
            width={isPieChart ? "md:w-[25rem]" : "md:w-[35rem]"}
          >
            {!hasData ? (
              <div className="grid place-content-center text-center text-gray-500 h-[15rem]">
                No Data Available
              </div>
            ) : isPieChart ? (
              <PieChartComponent
                chartData={chartData}
                chartConfig={chartConfig}
                datakey="value"
                XaxisdataKey="category"
              />
            ) : (
              <BarChartComponent
                chartData={chartData}
                chartConfig={chartConfig}
                datakeys={
                  Object.keys(chartData[0] ?? {}).includes("value")
                    ? ["value"]
                    : ["available", "not_available"]
                }
                XaxisdataKey="category"
              />
            )}
          </GraphWrapperComponent>
        );
      })}
    </div>
  );
};

export default AnalysisDisplay;
