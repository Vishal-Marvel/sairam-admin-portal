import React, { useEffect, useState, useMemo } from "react";
import { ChartConfig, VillageAggregatedData, VillageWiseAnalyticalData } from "@/schema";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import SelectComponent from "@/components/SelectComponent";
import Analysis from "./Analysis";
import { MultipleSelect } from "@/components/MultipleSelect";
import { mergeVillageAggregatedDataArray } from "@/lib/utils";

const DATA_LIST = [
  { label: "Household Info", value: "household_info" },
  { label: "Migration Info", value: "migration_info" },
  { label: "Swachh Bharat", value: "swachh_bharat" },
  { label: "Electricity", value: "electricity" },
  { label: "Petroleum", value: "petroleum" },
  { label: "Land Info", value: "land_info" },
  { label: "Agricultural Inputs", value: "agricultural_inputs" },
  { label: "Livestock", value: "livestock" },
  { label: "Crop Info", value: "crop_info" },
  { label: "Family Info", value: "family_info" },
];

export default function AnalysisPage() {
  const [data, setData] = useState<VillageWiseAnalyticalData>({});
  const [currentVillage, setCurrentVillage] = useState<string[]>([]);
  const [currentDataset, setCurrentDataset] = useState<string>(DATA_LIST[0].value);
  const { startLoad, stopLoad } = useLoader();

  // Filter dataset options based on selected villages
  const dataList = useMemo(() => {
    if (currentVillage.length === 1) {
      return DATA_LIST.filter((d) => d.value !== "land_info");
    }
    return DATA_LIST;
  }, [currentVillage]);

  // Fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        startLoad();
        const response = await axiosInstance.get("/analytics/villagewise");
        setData(response.data.villageSummary);
      } catch (err) {
        console.log(err);
      } finally {
        stopLoad();
      }
    };
    getData();
  }, [startLoad, stopLoad]);

  // Compute current data based on selected villages
  const currentData = useMemo(() => {
    if (currentVillage.length === 0) {
      return data["All Villages"];
    }
    return mergeVillageAggregatedDataArray(currentVillage, data);
  }, [currentVillage, data]);

  // Ensure "land_info" is not selected for single village
  useEffect(() => {
    if (currentVillage.length === 1 && currentDataset === "land_info") {
      setCurrentDataset("household_info");
    }
  }, [currentVillage, currentDataset]);

  // Prepare village options for select
  const villageOptions = useMemo(
    () =>
      Object.keys(data)
        .filter((village) => village !== "All Villages")
        .map((village) => ({ label: village, value: village })),
    [data]
  );

  return (
    <div className="flex flex-col justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center md:text-4xl text-2xl font-bold text-amber-600">
        {currentDataset.replace(/_/g, " ")} analysis
      </span>
      <div className="flex md:px-10 gap-2 md:w-full">
        <div className="flex items-center gap-2">
          <span className="hidden md:block">Get Analysis for </span>
          <MultipleSelect
            options={villageOptions}
            onSelect={setCurrentVillage}
            selectedValues={new Set(currentVillage)}
            title="Select Village"
          />
          <SelectComponent
            values={dataList}
            onChange={setCurrentDataset}
            value={currentDataset}
            placeholder="Select Dataset"
          />
        </div>
      </div>
      {currentData && currentData[currentDataset as keyof VillageAggregatedData] && (
        <Analysis
          fullData={data}
          village={currentVillage}
          dataset={currentDataset}
          data={currentData[currentDataset as keyof VillageAggregatedData]}
        />
      )}
    </div>
  );
}
