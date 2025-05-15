import { SchemeData, SurveyRecord, VillageWiseSchemes } from "@/schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ChartConfig = Record<
  string,
  { label: string; fill?: string; color?: string }
>;

export function generateChartConfig(data: Record<string, number>): ChartConfig {
  const config: ChartConfig = {
    value: { label: "Count", color: getRandomColor() },
    available: { label: "Available", color: "#00ff00" },
    not_available: { label: "Not Available", fill: "#ffaa00", color: "#ffaa00" },
  };

  for (const key of Object.keys(data)) {
    config[key] = {
      label: capitalize(key),
      fill: getRandomColor(),
      color: getRandomColor(),
    };
  }

  return config;
}

// Capitalizes first letter (you can customize this if needed)
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getRandomColor(): string {
  const hue = Math.floor(Math.random() * 360); // Full hue range
  return `hsl(${hue}, 70%, 60%)`; // Saturation and lightness fixed for readability
}

export function getUniqueVillageNames(data: SurveyRecord[]): string[] {
  const villageNameSet = new Set<string>();

  for (const record of data) {
    villageNameSet.add(record.village_name);
  }

  return Array.from(villageNameSet);
}

export function generateData<K extends keyof SchemeData>(
  data: VillageWiseSchemes,
  key: K
): { village_name: string; count: number }[] {
  const result = [];
  for (const village in data) {
    const count = data[village][key];
    result.push({ village_name: village.split("(")[0], count });
  }
  return result;
}
