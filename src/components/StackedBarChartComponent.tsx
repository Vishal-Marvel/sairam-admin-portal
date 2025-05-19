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

interface StackedBarChartComponentProps {
  chartData: any;
  XaxisdataKey: string;
  datakeys: string[];
  chartConfig: ChartConfig;
}

const StackedBarChartComponent = (props: StackedBarChartComponentProps) => {
  return (
    <div className="w-full h-[20rem] overflow-x-auto">
      {/* <div style={{ width: `${Math.max(props.chartData?.length * 5, 35)}rem`, height: "15rem" }}> */}
      <Bar
        className="w-full"
        data={{
          labels: props.chartData?.map((data: any) => data[props.XaxisdataKey]),
          datasets: props.datakeys.map((datakey) => ({
            label: props.chartConfig[datakey]?.label || datakey,
            data: props.chartData?.map((data: any) => data[datakey]),
            backgroundColor: props.chartConfig[datakey]?.color || "gray",
            borderWidth: 1,
            borderRadius: 5,
            
          })),
        }}
        width={50}
        
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              stacked: true,
              grid: { display:false, offset: true },
            },
            y: {
              stacked: true,
            },
          },
          indexAxis: "y",
          layout: {
            padding: { left: 0, right: 0, top: 15, bottom: 0 },
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: { padding: 10 },
            },
            datalabels: {
              display: true,
              anchor: "center",
              align: "center",
              color: "black",
              font: { weight: "bold" },
            },
          },
        }}
      />
    </div>
    // </div>
  );
};

export default StackedBarChartComponent;
