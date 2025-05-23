"use client";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartConfig } from "@/schema";
import { capitalize } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PieChartComponentProps {
  chartData: Array<Record<string, any>>;
  chartConfig: ChartConfig;
  XaxisdataKey: string;
  datakey: string;
}

const PieChartComponent = ({
  chartData,
  chartConfig,
  XaxisdataKey,
  datakey,
}: PieChartComponentProps) => {
  const labels = chartData?.map((data) => capitalize(data[XaxisdataKey]));
  const data = chartData.map((item) => item[datakey]);
  const backgroundColor = chartData.map((item) => item.fill);

  const pieData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "#000",
        font: { weight: "normal" },
        formatter: (value: number) => `${value}`,
      },
      legend: chartConfig?.legend,
      tooltip: chartConfig?.tooltip,
    },
    ...chartConfig?.options,
  };

  return (
    <div className="h-[15rem] grid place-content-center">
      <Pie
        data={pieData}
        //@ts-ignore
        options={options}
      />
    </div>
  );
};

export default PieChartComponent;
