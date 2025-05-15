"use client";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

import { ChartConfig } from "@/schema";
import { capitalize } from "@/lib/utils";

interface PieChartComponentProps {
  chartData: any;
  chartConfig: ChartConfig;
  XaxisdataKey: string;
  datakey: string;
}

const PieChartComponent = (props: PieChartComponentProps) => {
  const labels = props.chartData?.map((data: any) =>
    capitalize(data[props.XaxisdataKey])
  );
  const data = props.chartData.map((item: any) => item[props.datakey]);
  const backgroundColor = props.chartData.map((item: any) => item.fill);

  return (
    <div className="h-[15rem] w-full grid place-content-center">
      <Pie
        data={{
          labels,
          datasets: [
            {
              data,
              backgroundColor,
              borderColor: "white",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          plugins: {
            datalabels: {
              color: "#000",
              font: {
                weight: "normal",
              },
              formatter: (value, context) => {
                const label = context.chart.data.labels?.[context.dataIndex];
                return `${value}`;
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PieChartComponent;
