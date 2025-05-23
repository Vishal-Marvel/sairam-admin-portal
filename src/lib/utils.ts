import {
  AvailableStatus,
  NestedCoutMap,
  SchemeData,
  SurveyRecord,
  VillageAggregatedData,
  VillageWiseAnalyticalData,
  VillageWiseSchemes,
} from "@/schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility: Merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Chart config type
type ChartConfig = Record<
  string,
  { label: string; fill?: string; color?: string }
>;

// Color palette for charts
const COLOR_PALETTE = [
  "#4BC0C0",
  "#FF9F40",
  "#9966FF",
  "#FF6384",
  "#36A2EB",
  "#C9CBCF",
  "#00A896",
  "#F67280",
  "#F8B195",
  "#355C7D",
];

// Get a random color from palette (optionally by index)
export function getRandomColor(index?: number): string {
  if (typeof index === "number" && index >= 0 && index < COLOR_PALETTE.length) {
    return COLOR_PALETTE[index];
  }
  const randIndex = Math.floor(Math.random() * COLOR_PALETTE.length);
  return COLOR_PALETTE[randIndex];
}

// Capitalize first letter
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Generate chart config from data keys
export function generateChartConfig(data: Record<string, number>): ChartConfig {
  const config: ChartConfig = {
    value: { label: "Count", color: getRandomColor() },
    available: { label: "Available", color: "#00ff00" },
    not_available: { label: "Not Available", fill: "#ffaa00", color: "#ffaa00" },
  };

  Object.keys(data).forEach((key, index) => {
    config[key] = {
      label: capitalize(key),
      fill: getRandomColor(index),
      color: getRandomColor(index),
    };
  });

  return config;
}

// Generate chart config for villages
export function generateChartConfigForVillage(data: string[]): ChartConfig {
  const config: ChartConfig = {
    value: { label: "Count", color: getRandomColor() },
    available: { label: "Available", color: "#00ff00" },
    not_available: { label: "Not Available", color: "#ffaa00" },
  };

  data.forEach((key, index) => {
    config[key] = {
      label: capitalize(key),
      fill: getRandomColor(index),
      color: getRandomColor(index),
    };
  });

  return config;
}

// Get unique village names from survey records
export function getUniqueVillageNames(data: SurveyRecord[]): string[] {
  return Array.from(new Set(data.map((record) => record.village_name)));
}

// Generate data for a specific scheme key
export function generateData<K extends keyof SchemeData>(
  data: VillageWiseSchemes,
  key: K
): { village_name: string; count: number }[] {
  return Object.entries(data).map(([village, scheme]) => ({
    village_name: village.split("(")[0],
    count: scheme[key],
  }));
}

// Transform item for charting
export function transformItem<Data extends Record<string, any>>(
  key: keyof Data,
  item: string,
  data: Data
) {
  const status: AvailableStatus = data[key][item];
  const value =
    Object.keys(status ?? {}).length === 0
      ? { value: status }
      : { ...status };

  return {
    category: capitalize(item.replace(/_/g, " ")),
    ...value,
    fill: getRandomColor(),
    color: getRandomColor(),
  };
}

// Merge two count maps (helper)
function mergeCountMaps<T extends Record<string, number>>(a: T, b: T): T {
  const result: Record<string, number> = { ...a };
  for (const key in b) {
    result[key] = (result[key] || 0) + b[key];
  }
  return result as T;
}

// Merge aggregated data for multiple villages
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
        for (const subKey in currentValue) {
          const subVal = currentValue[subKey as keyof typeof currentValue];
          const mergedSubVal = mergedValue?.[subKey as keyof typeof mergedValue];

          if (typeof subVal === "number") {
            // @ts-ignore
            mergedValue[subKey as keyof typeof mergedValue] =
              ((mergedSubVal as number) || 0) + subVal;
          } else if (typeof subVal === "object" && subVal !== null) {
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

// Get chart data for a date range
export function getChartDataForDateRange(
  inputData: NestedCoutMap,
  selectedDateRange: string
) {
  const now = new Date();
  const allVillages = new Set<string>();
  const allDates = Object.keys(inputData)
    .map((dateStr) => new Date(dateStr))
    .sort((a, b) => a.getTime() - b.getTime());

  // Helper: get start date for range
  const getStartDate = (range: string) => {
    const date = new Date(now);
    switch (range) {
      case "last_week":
        date.setDate(date.getDate() - 7);
        break;
      case "last_month":
        date.setMonth(date.getMonth() - 1);
        break;
      case "last_quarter":
        date.setMonth(date.getMonth() - 3);
        break;
      case "last_year":
        date.setFullYear(date.getFullYear() - 1);
        break;
      case "all":
      default:
        return new Date("2000-01-01");
    }
    return date;
  };

  const startDate = getStartDate(selectedDateRange);
  const filtered = allDates.filter((d) => d >= startDate && d <= now);

  // Helper: create label for date range
  const createRangeLabel = (from: Date, to: Date) =>
    `${from.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    })} - ${to.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    })}`;

  // Generate date buckets
  let buckets: { label: string; from: Date; to: Date }[] = [];
  if (selectedDateRange === "last_week") {
    buckets = filtered.map((date) => ({
      label: date.toISOString().slice(0, 10),
      from: date,
      to: date,
    }));
  } else if (selectedDateRange === "last_month") {
    const toDate = new Date(startDate);
    for (let i = 0; i < 4; i++) {
      const from = new Date(toDate);
      toDate.setDate(toDate.getDate() + 7 + (i % 2));
      const to = new Date(toDate);
      buckets.push({ label: createRangeLabel(from, toDate), from, to });
    }
  } else if (selectedDateRange === "last_quarter") {
    const toDate = new Date(startDate);
    for (let i = 0; i < 15 && toDate < now; i++) {
      const from = new Date(toDate);
      toDate.setMonth(toDate.getMonth() + 1);
      const to = new Date(toDate);
      buckets.push({ label: createRangeLabel(from, toDate), from, to });
    }
  } else if (selectedDateRange === "last_year") {
    const toDate = new Date(startDate);
    for (let i = 0; i < 15 && toDate < now; i++) {
      const from = new Date(toDate);
      toDate.setMonth(toDate.getMonth() + 3);
      const to = new Date(toDate);
      buckets.push({ label: createRangeLabel(from, toDate), from, to });
    }
  } else {
    buckets = [{ label: "All Time", from: startDate, to: now }];
  }

  // Build chart data from buckets
  const chartData = buckets.map(({ label, from, to }) => {
    const entry: Record<string, any> = { category: label };
    Object.entries(inputData).forEach(([dateStr, villages]) => {
      const date = new Date(dateStr);
      if (date >= from && date <= to) {
        Object.entries(villages).forEach(([village, count]) => {
          allVillages.add(village);
          entry[village] = (entry[village] || 0) + count;
        });
      }
    });
    return entry;
  });

  return {
    chartData,
    dataKeys: Array.from(allVillages),
  };
}
