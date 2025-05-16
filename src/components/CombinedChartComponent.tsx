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
  chartData: any;
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
  const labels = chartData?.map((data: any) => data[XaxisdataKey]);

  const datasets = datakeys.map((key) => ({
    type: chartConfig[key].type ?? "bar",
    label: chartConfig[key].label,
    data: chartData.map((data: any) => data[key]),
    backgroundColor:
      chartConfig[key].type === "line" ? undefined : chartConfig[key].color,
    borderColor: chartConfig[key].color,
    borderWidth: 2,
    borderRadius: chartConfig[key].type === "bar" ? 5 : 0,
    yAxisID: chartConfig[key].yAxisID ?? "y",
    fill: false,
    tension: 0.3,
    stack: "combined",
    pointBackgroundColor: chartConfig[key].color,
    order: chartConfig[key].order,
  }));

  return (
    <div className="h-[15rem] w-full">
      <Chart
        type="line"
        data={{
          labels,
          datasets,
        }}
        options={{
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
                drawOnChartArea: false, // prevents y1 grid from overlapping y
              },
              title: {
                display: true,
                text: "Productivity",
              },
            },
          },
          layout: {
            padding: {
              top: 15,
            },
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 10,
              },
            },
            datalabels: {
              anchor: "end",
              align: "top",
              color: "black",
              font: {
                weight: "normal",
              },
              formatter: Math.round,
              padding: {
                top: -10,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CombinedChartComponent;
