"use client";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartConfig } from "@/schema";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface StackedBarChartComponentProps {
  chartData: any[];
  XaxisdataKey: string;
  datakeys: string[];
  chartConfig: ChartConfig;
}

const StackedBarChartComponent = ({
  chartData = [],
  XaxisdataKey,
  datakeys,
  chartConfig,
}: StackedBarChartComponentProps) => {
  const labels = chartData.map((data) => data[XaxisdataKey]);
  const datasets = datakeys.map((datakey) => ({
    label: chartConfig[datakey]?.label || datakey,
    data: chartData.map((data) => data[datakey]),
    backgroundColor: chartConfig[datakey]?.color || "gray",
    borderWidth: 1,
    borderRadius: 5,
  }));

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: "y" as const,
    layout: {
      padding: { left: 0, right: 0, top: 15, bottom: 0 },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false, offset: true },
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { padding: 10 },
      },
      datalabels: {
        display: true,
        anchor: "center" as const,
        align: "center" as const,
        color: "black",
        font: { weight: "bold" },
      },
    },
  };

  return (
    <div className="w-full h-[20rem] overflow-x-auto">
      <Bar
        className="w-full"
        data={{ labels, datasets }}
        width={50}
        //@ts-ignore
        options={options}
      />
    </div>
  );
};

export default StackedBarChartComponent;
