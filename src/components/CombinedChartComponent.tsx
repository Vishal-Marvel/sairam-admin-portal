"use client";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

export interface CombinedChartConfig {
  [key: string]: {
    label: string;
    color: string;
    type?: "bar" | "line";
    yAxisID?: "y" | "y1";
    order: number;
  };
}

interface CombinedChartComponentProps {
  chartData: Record<string, any>[];
  XaxisdataKey: string;
  datakeys: string[];
  chartConfig: CombinedChartConfig;
}

const CombinedChartComponent = ({
  chartData,
  XaxisdataKey,
  datakeys,
  chartConfig,
}: CombinedChartComponentProps) => {
  const labels = chartData?.map((data) => data[XaxisdataKey]);

  const datasets = datakeys.map((key) => {
    const config = chartConfig[key];
    return {
      type: config.type ?? "bar",
      label: config.label,
      data: chartData.map((data) => data[key]),
      backgroundColor: config.type === "line" ? undefined : config.color,
      borderColor: config.color,
      borderWidth: 2,
      borderRadius: config.type === "bar" ? 5 : 0,
      yAxisID: config.yAxisID ?? "y",
      fill: false,
      tension: 0.3,
      stack: "combined",
      pointBackgroundColor: config.color,
      order: config.order,
    };
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          offset: true,
        },
      },
      y: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Area",
        },
      },
      y1: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Productivity",
        },
      },
    },
    layout: {
      padding: { top: 15 },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: { padding: 10 },
      },
      datalabels: {
        anchor: "end",
        align: "top",
        color: "black",
        formatter: Math.round,
        padding: { top: -10 },
      },
    },
  };

  return (
    <div className="h-[15rem] w-full">
      <Chart
        type="line"
        data={{ labels, datasets }}
        //@ts-ignore
        options={options}
      />
    </div>
  );
};

export default CombinedChartComponent;
