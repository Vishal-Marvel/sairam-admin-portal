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
    not_available: {
      label: "Not Available",
      fill: "#ffaa00",
      color: "#ffaa00",
    },
  };

  Object.keys(data).map((key, index) => {
    config[key] = {
      label: capitalize(key),
      fill: getRandomColor(index),
      color: getRandomColor(index),
    };
  });

  return config;
}

export function generateChartConfigForVillage(data: string[]): ChartConfig {
  const config: ChartConfig = {
    value: { label: "Count", color: getRandomColor() },
    available: { label: "Available", color: "#00ff00" },
    not_available: {
      label: "Not Available",
      color: "#ffaa00",
    },
  };

  data.map((key, index) => {
    config[key] = {
      label: capitalize(key),
      fill: getRandomColor(index),
      color: getRandomColor(index),
    };
  });

  return config;
}

// Capitalizes first letter (you can customize this if needed)
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getRandomColor(index?: number): string {
  const colorPalette = [
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
  const Ranindex = Math.floor(Math.random() * 10); // Full hue range
  return colorPalette[index || Ranindex]; // Saturation and lightness fixed for readability
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
          const mergedSubVal =
            mergedValue?.[subKey as keyof typeof mergedValue];

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
function mergeCountMaps<T extends Record<string, number>>(a: T, b: T): T {
  const result: Record<string, number> = { ...a };
  for (const key in b) {
    result[key] = (result[key] || 0) + b[key];
  }
  return result as T;
}

export function getChartDataForDateRange(
  inputData: NestedCoutMap,
  selectedDateRange: string
) {
  const now = new Date();
  const allVillages = new Set<string>();

  // Get all dates in inputData and sort them
  const allDates = Object.keys(inputData)
    .map((dateStr) => new Date(dateStr))
    .sort((a, b) => a.getTime() - b.getTime());

  // Define start date based on selected range
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

  // console.log(filteredDates);
  // --- Generate date buckets based on selected range ---
  let buckets: { label: string; from: Date; to: Date }[] = [];

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

  if (selectedDateRange === "last_week") {
    // Each date is a bucket
    buckets = filtered.map((date) => ({
      label: date.toISOString().slice(0, 10),
      from: date,
      to: date,
    }));
  } else if (selectedDateRange === "last_month") {
    // Weekly buckets (7-day range)
    const toDate = new Date(startDate);
    for (let i = 0; i < 4; i += 1) {
      const from = new Date(toDate);
      toDate.setDate(toDate.getDate() + 7 + (i % 2));
      const to = new Date(toDate);
      buckets.push({ label: createRangeLabel(from, toDate), from, to });
    }
  } else if (selectedDateRange === "last_quarter") {
    // Monthly buckets (1 month range)
    const toDate = new Date(startDate);
    for (let i = 0; i < 15 && toDate < now; i += 1) {
      const from = new Date(toDate);
      toDate.setMonth(toDate.getMonth() + 1);
      const to = new Date(toDate);
      buckets.push({ label: createRangeLabel(from, toDate), from, to });
    }
  } else if (selectedDateRange === "last_year") {
    // Quarterly buckets (3 month range)
    const toDate = new Date(startDate);
    for (let i = 0; i < 15 && toDate < now; i += 1) {
      const from = new Date(toDate);
      toDate.setMonth(toDate.getMonth() + 3);
      const to = new Date(toDate);
      buckets.push({ label: createRangeLabel(from, toDate), from, to });
    }
  } else {
    // "all" case – one single range
    buckets = [{ label: "All Time", from: startDate, to: now }];
  }
  // console.log(buckets)
  // --- Build chart data from buckets ---
  const chartData = buckets.map(({ label, from, to }) => {
    const entry: Record<string, any> = { category: label };

    // Loop over each date in inputData within this range
    Object.entries(inputData).forEach(([dateStr, villages]) => {
      const date = new Date(dateStr);
      if (date >= from && date <= to) {
        Object.entries(villages).forEach(([village, count]) => {
          allVillages.add(village);
          if (!entry[village]) entry[village] = 0;
          entry[village] += count;
        });
      }
    });
    // console.log(entry);

    return entry;
  });
  // console.log(buckets, filtered);
  return {
    chartData,
    dataKeys: Array.from(allVillages),
  };
}
