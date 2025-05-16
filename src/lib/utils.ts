import { AvailableStatus, SchemeData, SurveyRecord, VillageAggregatedData, VillageWiseAnalyticalData, VillageWiseSchemes } from "@/schema";
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
export function transformItem<Data extends Record<string, any>>(
  key: keyof Data,
  item: string,
  data: Data
) {
  const status: AvailableStatus = data[key][item];

  let value;
  if (Object.keys(data[key][item] ?? {}).length == 0)
    value = { value: data[key][item] };
  else value = { ...status };

  return {
    category: capitalize(item.replace(/_/g, " ")),
    ...value,
    fill: getRandomColor(),
    color: getRandomColor(),
  };
}

export function mergeVillageAggregatedDataArray(
  villages: string[],
  fullData: VillageWiseAnalyticalData
): VillageAggregatedData {
  const dataArray = villages.map((village) => fullData[village]);
  const merged: VillageAggregatedData = JSON.parse(
    JSON.stringify(dataArray[0] || {})
  );

  for (let i = 1; i < dataArray.length; i++) {
    const current = dataArray[i];

    for (const key in current) {
      const category = key as keyof VillageAggregatedData;
      const currentValue = current[category];
      const mergedValue = merged[category];

      if (!currentValue) continue;

      if (typeof currentValue === "object" && !Array.isArray(currentValue)) {
        // Nested merge
        for (const subKey in currentValue) {
          const subVal = currentValue[subKey as keyof typeof currentValue];
          const mergedSubVal = mergedValue?.[subKey as keyof typeof mergedValue];

          if (typeof subVal === "number") {
            // Numeric value
            //@ts-ignore
            mergedValue[subKey as keyof typeof mergedValue] =
              ((mergedSubVal as number) || 0) + subVal;
          } else if (typeof subVal === "object" && subVal !== null) {
            // Deep count maps or nested objects
            mergedValue[subKey as keyof typeof mergedValue] = mergeCountMaps(
              mergedSubVal || {},
              subVal
            );
          }
        }
      }
    }
  }

  return merged;
}

// Helper to merge CountMap-like objects
function mergeCountMaps<T extends Record<string, number>>(
  a: T,
  b: T
): T {
  const result: Record<string, number> = { ...a };
  for (const key in b) {
    result[key] = (result[key] || 0) + b[key];
  }
  return result as T;
}
