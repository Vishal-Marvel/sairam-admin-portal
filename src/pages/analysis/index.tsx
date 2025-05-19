import {
  ChartConfig,
  VillageAggregatedData,
  VillageWiseAnalyticalData,
} from "@/schema";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import React, { useEffect, useState } from "react";
import SelectComponent from "@/components/SelectComponent";
import Analysis from "./Analysis";
import { MultipleSelect } from "@/components/MultipleSelect";
import { mergeVillageAggregatedDataArray } from "@/lib/utils";

export default function AnalysisPage() {
  const [data, setdata] = useState<VillageWiseAnalyticalData>({});

  const { startLoad, stopLoad } = useLoader();
  const [currentVillage, setCurrentVillage] = useState<string[]>([]);
  const [currentData, setCurrentData] = useState<VillageAggregatedData>();

  const [dataList, setDataList] = useState([
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
  ]);

  const [currentDataset, setCurrentDataset] = useState<string>(
    dataList[0].value
  );
  const getData = async () => {
    try {
      startLoad();
      const response = await axiosInstance.get("/analytics/villagewise");
      setdata(response.data.villageSummary);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoad();
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (currentVillage.length == 1) {
      setDataList((prev) => prev.filter((d) => d.value != "land_info"));
    } else {
      setDataList([
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
      ]);
    }
  }, [currentVillage]);

  useEffect(() => {
    if (currentVillage.length == 0) {
      setCurrentData(data["All Villages"]);
      
    } else {
      setCurrentData(mergeVillageAggregatedDataArray(currentVillage, data));
    }
  }, [currentVillage, data]);

  useEffect(() => {
    if (currentVillage.length == 1 && currentDataset == "land_info") {
      setCurrentDataset("household_info");
    }
  }, [currentDataset, currentVillage]);

  return (
    <div className="flex flex-col justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center text-4xl font-bold text-amber-600">
        {currentDataset.replace(/_/g, " ")} analysis
      </span>
      <div className="flex md:px-10 gap-2 w-full">
        <div className="flex items-center gap-2">
          <span>Get Analysis for </span>
          <MultipleSelect
            options={Object.keys(data)
              .filter((village) => village !== "All Villages")
              .map((village) => {
                return { label: village, value: village };
              })}
            onSelect={(value) => setCurrentVillage(value)}
            selectedValues={new Set(currentVillage)}
            title="Select Village"
          />
          <SelectComponent
            values={dataList}
            onChange={(value) => setCurrentDataset(value)}
            value={currentDataset}
            placeholder="Select Dataset"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5">
        {currentData &&
          currentData[currentDataset as keyof VillageAggregatedData] && (
            <Analysis
              fullData={data}
              village={currentVillage}
              dataset={currentDataset}
              data={currentData[currentDataset as keyof VillageAggregatedData]}
            />
          )}
      </div>
    </div>
  );
}
