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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

import { ChartConfig } from "@/schema";

interface BarChartComponentProps {
  chartData: any;
  XaxisdataKey: string;
  datakeys: string[];
  chartConfig: ChartConfig;
}

const BarChartComponent = (props: BarChartComponentProps) => {
    // const barWidth = Math.max(props.chartData?.length * 5, 35); // 50px per bar, with minimum fallback

  return (
    <div className="w-full h-[15rem]">
      {/* <div style={{ width: `${barWidth}rem`, height: "15rem" }}> */}
        <Bar
          className={"w-full"}
          data={{
            labels: props.chartData?.map(
              (data: any) => data[props.XaxisdataKey]
            ),
            datasets: props.datakeys.map((datakey) => ({
              label: props.chartConfig[datakey].label,
              data: props.chartData?.map((data: any) => data[datakey]),
              backgroundColor: props.chartConfig[datakey].color,
              borderColor: "red",
              borderWidth: 1,
              borderRadius: 5,
            })),
          }}
          width={50}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false, // 👈 removes vertical grid lines
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
                position: "bottom",
                labels: {
                  padding: 10, // 👈 optional: more spacing inside legend items
                },
              },
              datalabels: {
                padding: {
                  top: -10,
                },
                anchor: "end",
                align: "top",
                color: "black",
                font: {
                  weight: "normal",
                },
                formatter: Math.round, // or custom formatter
              },
            },
          }}
        />
      </div>
    // </div>
  );
};

export default BarChartComponent;
