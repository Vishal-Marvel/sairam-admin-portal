import BarChartComponent from "@/components/BarChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import { ChartConfig } from "@/components/ui/chart";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { VillageWise } from "@/schema";
import React, { useEffect, useState } from "react";
import SelectVillage from "../report/SelectVillage";
import PieChartComponent from "@/components/PieChartComponent";
import {
  generateChartConfig,
  getRandomColor,
  mergeAnalyticsData,
} from "@/lib/utils";

export default function AnalysisPage() {
  const [data, setdata] = useState<VillageWise>({});
  const { startLoad, stopLoad } = useLoader();
  const [currentVillage, setCurrentVillage] = useState<string>("All Villages");
  const [genderData, setGenderData] = useState<{}>([]);
  const [categoryData, setCategoryData] = useState<{}>([]);
  const [waterStorageData, setWaterStorageData] = useState<{}>([]);
  const [waterCollectionData, setWaterCollectionData] = useState<{}>([]);
  const [cookingData, setCookingData] = useState<{}>([]);
  const [categoryConfig, setCategoryConfig] = useState<ChartConfig>({});
  const [waterStorageConfig, setwaterStorageConfig] = useState<ChartConfig>({});
  const [waterCollectionConfig, setwaterCollectionConfig] =
    useState<ChartConfig>({});
  const [cookingConfig, setcookingConfig] = useState<ChartConfig>({});

  const changeVillage = (village: string) => {
    setCurrentVillage(village);
  };

  const getData = async () => {
    try {
      startLoad();
      const response = await axiosInstance.get("/analytics/villagewise");
      setdata(response.data.villageSummary);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoad();
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const genderConfig = {
    value: { label: "Count" },
    male: { label: "Male" },
    female: { label: "Female" },
    others: { label: "Others" },
  } satisfies ChartConfig;

  useEffect(() => {
    const isAllVillages = currentVillage === "All Villages";
    const selectedData = isAllVillages
    ? mergeAnalyticsData(data)
    : data[currentVillage];
    if (!selectedData) return;
    
    setCategoryConfig(generateChartConfig(selectedData?.category));
    setwaterStorageConfig(
      generateChartConfig(selectedData?.mode_of_water_storage)
    );
    setwaterCollectionConfig(
      generateChartConfig(selectedData?.water_collection_type)
    );
    setcookingConfig(generateChartConfig(selectedData?.used_for_cooking));
    setGenderData([
      { gender: "male", value: selectedData?.male, fill: "#3b82f6" },
      {
        gender: "female",
        value: selectedData?.female,
        fill: "#f59e0b",
      },
      {
        gender: "others",
        value: selectedData?.others,
        fill: "#ef4444",
      },
    ]);
    if (selectedData?.category)
      setCategoryData(
        Object.keys(selectedData?.category).map((category) => {
          return {
            category: category,
            value: selectedData?.category[category],
            fill: getRandomColor(),
          };
        })
      );
    if (selectedData?.mode_of_water_storage)
      setWaterStorageData(
        Object.keys(selectedData?.mode_of_water_storage).map((category) => {
          return {
            category: category,
            value: selectedData?.mode_of_water_storage[category],
            fill: getRandomColor(),
          };
        })
      );
    if (selectedData?.water_collection_type)
      setWaterCollectionData(
        Object.keys(selectedData?.water_collection_type).map((category) => {
          return {
            category: category,
            value: selectedData?.water_collection_type[category],
            fill: getRandomColor(),
          };
        })
      );
    if (selectedData?.used_for_cooking)
      setCookingData(
        Object.keys(selectedData?.used_for_cooking).map((category) => {
          return {
            category: category,
            value: selectedData?.used_for_cooking[category],
            fill: getRandomColor(),
          };
        })
      );
  }, [data, currentVillage]);

  return (
    <div className="flex flex-col justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center text-4xl font-bold text-amber-600">
        village wise survey analysis
      </span>
      <div className="flex md:px-10 gap-2 w-full">
        <div className="flex items-center gap-2">
          <span>Get Report for </span>
          <SelectVillage
            villages={["All Villages", ...Object.keys(data)]}
            onChange={changeVillage}
            value={currentVillage}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5">
        <GraphWrapperComponent title="Gender Analysis">
          <PieChartComponent
            chartConfig={genderConfig}
            chartData={genderData}
            XaxisdataKey="gender"
            datakey={"value"}
          />
        </GraphWrapperComponent>
        <GraphWrapperComponent title="Category Analysis">
          <PieChartComponent
            chartConfig={categoryConfig}
            chartData={categoryData}
            XaxisdataKey="category"
            datakey={"value"}
          />
        </GraphWrapperComponent>
        <GraphWrapperComponent title="Water Storage Analysis">
          <PieChartComponent
            chartConfig={waterStorageConfig}
            chartData={waterStorageData}
            XaxisdataKey="category"
            datakey={"value"}
          />
        </GraphWrapperComponent>
        <GraphWrapperComponent title="Water Collection Analysis">
          <PieChartComponent
            chartConfig={waterCollectionConfig}
            chartData={waterCollectionData}
            XaxisdataKey="category"
            datakey={"value"}
          />
        </GraphWrapperComponent>
        <GraphWrapperComponent title="Cooking Analysis">
          <PieChartComponent
            chartConfig={cookingConfig}
            chartData={cookingData}
            XaxisdataKey="category"
            datakey={"value"}
          />
        </GraphWrapperComponent>
      </div>
    </div>
  );
}
