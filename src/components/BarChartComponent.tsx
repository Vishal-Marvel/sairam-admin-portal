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

interface BarChartComponentProps {
  chartData: any[];
  XaxisdataKey: string;
  datakeys: string[];
  chartConfig: ChartConfig;
}

const BarChartComponent = ({
  chartData = [],
  XaxisdataKey,
  datakeys,
  chartConfig,
}: BarChartComponentProps) => {
  const labels = chartData.map((data) => data[XaxisdataKey]);
  const datasets = datakeys.map((datakey) => ({
    label: chartConfig[datakey].label,
    data: chartData.map((data) => data[datakey]),
    backgroundColor: chartConfig[datakey].color,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
  }));

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          offset: true,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 15,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 10,
        },
      },
      datalabels: {
        padding: { top: -10 },
        anchor: "end" as const,
        align: "top" as const,
        color: "black",
      },
    },
  };

  return (
    <div className="w-full h-[15rem]">
      <Bar
        className="w-full"
        data={{ labels, datasets }}
        //@ts-ignore
        options={options}
      />
    </div>
  );
};

export default BarChartComponent;
