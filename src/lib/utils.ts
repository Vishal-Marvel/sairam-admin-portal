import {
  VillageWise,
  AnalyticsSummary,
  SurveyRecord,
  VillageWiseSchemes,
} from "@/schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ChartConfig = Record<string, { label: string; fill?: string }>;

export function generateChartConfig(data: Record<string, number>): ChartConfig {
  const config: ChartConfig = {
    value: { label: "Count" },
  };

  for (const key of Object.keys(data)) {
    config[key] = { label: capitalize(key), fill: getRandomColor() };
  }

  return config;
}

// Capitalizes first letter (you can customize this if needed)
function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getRandomColor(): string {
  const hue = Math.floor(Math.random() * 360); // Full hue range
  return `hsl(${hue}, 70%, 60%)`; // Saturation and lightness fixed for readability
}

export function mergeAnalyticsData(data: VillageWise): AnalyticsSummary {
  const summary: AnalyticsSummary = {
    male: 0,
    female: 0,
    others: 0,
    category: {},
    mode_of_water_storage: {},
    water_collection_type: {},
    used_for_cooking: {},
    sanitation_system_type: {},
  };

  for (const village in data) {
    const item = data[village];
    summary.male += item.male;
    summary.female += item.female;
    summary.others += item.others;

    const keysToMerge = [
      "category",
      "mode_of_water_storage",
      "water_collection_type",
      "used_for_cooking",
      "sanitation_system_type",
    ] as const;

    for (const key of keysToMerge) {
      for (const subKey in item[key]) {
        summary[key][subKey] = (summary[key][subKey] || 0) + item[key][subKey];
      }
    }
  }

  return summary;
}

export function getUniqueVillageNames(data: SurveyRecord[]): string[] {
  const villageNameSet = new Set<string>();

  for (const record of data) {
    villageNameSet.add(record.village_name);
  }

  return Array.from(villageNameSet);
}

export function generateData(
  data: VillageWiseSchemes
): { village_name: string; count: number }[] {
  const result = [];
  for (const village in data) {
    const count = data[village].avg_awareness_level;
    result.push({ village_name: village, count });
  }
  return result;
}

export function generateChartConfig2() {
  const chartConfig = {
    count: {
      label: "Count",
      //@ts-ignore
      color: getRandomColor(),
    },
  } satisfies ChartConfig;
  return chartConfig;
}
