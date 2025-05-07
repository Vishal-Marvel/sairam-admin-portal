"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
interface PieChartComponentProps {
  chartData: any;
  chartConfig: ChartConfig;
  XaxisdataKey: string;
  datakey: string;
}
const PieChartComponent = (props: PieChartComponentProps) => {
  return (
    <ChartContainer
      config={props.chartConfig}
      className="min-h-[15rem] w-full"
    >
      <PieChart>
        <Pie
          data={props.chartData}
          dataKey={"value"}
          label
          nameKey={props.XaxisdataKey}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />

        <ChartLegend
          content={<ChartLegendContent nameKey={props.XaxisdataKey} />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
};

export default PieChartComponent;
