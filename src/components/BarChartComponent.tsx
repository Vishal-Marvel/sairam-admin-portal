"use client";

import { Bar, BarChart, CartesianGrid, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartComponentProps {
  chartData: any;
  chartConfig: ChartConfig;
  XaxisdataKey: string;
  datakeys: string[];
}

const BarChartComponent = (props: BarChartComponentProps) => {
  return (
    <ChartContainer config={props.chartConfig} className="min-h-[15rem] w-full">
      <BarChart accessibilityLayer data={props.chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={props.XaxisdataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {props.datakeys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={4}
          />
        ))}
      </BarChart>
      {/* <LineChart accessibilityLayer /> */}

    </ChartContainer>
  );
};

export default BarChartComponent;
