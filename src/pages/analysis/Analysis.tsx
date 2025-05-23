import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { VillageAggregatedData, VillageWiseAnalyticalData } from "@/schema";
import CropInfo from "./CropInfo";
import AnalysisDisplay from "./AnalysisDisplay";
import HiddenColms from "./HiddenColms";

export type Data = VillageAggregatedData[keyof VillageAggregatedData];

interface AnalysisProps {
  data: Data;
  fullData: VillageWiseAnalyticalData;
  village: string[];
  dataset: string;
}

const LOCAL_STORAGE_KEY = "hiddenList";

const getHiddenListFromStorage = (dataset: string): string[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return [];
  return stored
    .split(",")
    .filter((item) => item.startsWith(`${dataset}.`))
    .map((item) => item.split(".")[1]);
};

const setHiddenListToStorage = (list: string[], dataset: string) => {
  const value = list.map((item) => `${dataset}.${item}`).join(",");
  localStorage.setItem(LOCAL_STORAGE_KEY, value);
};

const Analysis = ({ data, fullData, village, dataset }: AnalysisProps) => {
  const [hiddenList, setHiddenList] = useState<string[]>([]);

  useEffect(() => {
    setHiddenList(getHiddenListFromStorage(dataset));
  }, [dataset]);

  const toggleHiddenList = (title: string) => {
    setHiddenList((prev) => {
      const exists = prev.includes(title);
      const newList = exists
        ? prev.filter((item) => item !== title)
        : [...prev, title];
      setHiddenListToStorage(newList, dataset);
      return newList;
    });
  };

  if (dataset === "crop_info") {
    return <CropInfo data={data} />;
  }

  const hiddenKeys = Object.keys(data).filter((key) =>
    hiddenList.includes(key.replace(/_/g, " "))
  );

  return (
    <div className="flex flex-col gap-5">
      <AnalysisDisplay
        data={data}
        fullData={fullData}
        village={village}
        dataset={dataset}
        toogleHiddenList={toggleHiddenList}
        hiddenList={hiddenList}
      />
      {hiddenList.length > 0 && (
        <div>
          <span className="font-bold text-xl">Hidden Columns:</span>
          <div className="flex flex-wrap justify-center items-center gap-5">
            {hiddenKeys.map((key) => (
              <HiddenColms
                key={key}
                title={key.replace(/_/g, " ")}
                handleHide={toggleHiddenList}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
