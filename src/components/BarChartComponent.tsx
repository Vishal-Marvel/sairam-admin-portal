"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useRef, useState } from "react";
import { chownSync } from "fs";

interface BarChartComponentProps {
  chartData: any;
  chartConfig: ChartConfig;
  XaxisdataKey: string;
  datakeys: string[];
}

const BarChartComponent = (props: BarChartComponentProps) => {
  const [width, setWidth] = useState<number>(0);
  const chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect) {
          setWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(chartRef.current);

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);
  return (
    <ChartContainer
      ref={chartRef}
      config={props.chartConfig}
      className="min-h-[15rem] w-full"
    >
      <BarChart accessibilityLayer data={props.chartData} margin={{ top: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={props.XaxisdataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: string) => {
            console.log(width)
            if (width < 500) {
              return value.length > 4 ? value.slice(0, 3) + "…" : value;
            } else if (width < 600) {
              return value.length > 5 ? value.slice(0, 4) + "…" : value;
            } else if (width < 700) {
              return value.length > 6 ? value.slice(0, 6) + "…" : value;
            }
            return value;
          }}
        />
        <YAxis tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
        <ChartLegend content={<ChartLegendContent />} />
        {props.datakeys.map((key) => (
          <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4}>
            <LabelList
              position="top"
              offset={6}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        ))}
      </BarChart>
      {/* <LineChart accessibilityLayer /> */}
    </ChartContainer>
  );
};

export default BarChartComponent;
