import BarChartComponent from "@/components/BarChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import { ChartConfig } from "@/components/ui/chart";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { VillageWise } from "@/schema";
import React, { useEffect, useState } from "react";
import SelectVillage from "../report/SelectVillage";
import PieChartComponent from "@/components/PieChartComponent";

export default function AnalysisPage() {
  const [data, setdata] = useState<VillageWise>({});
  const { startLoad, stopLoad } = useLoader();
  const [currentVillage, setCurrentVillage] = useState<string>("");
  const [genderData, setGenderData] = useState<{}>([]);
  const [categoryData, setCategoryData] = useState<{}>([]);
  const [waterStorageData, setWaterStorageData] = useState<{}>([]);
  const [waterCollectionData, setWaterCollectionData] = useState<{}>([]);
  const [cookingData, setCookingData] = useState<{}>([]);
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

  const categoryConfig = {
    value: { label: "Count" },
    General: { label: "General" },
    SC: { label: "SC" },
    ST: { label: "ST" },
    OBC: { label: "OBC" },
    BC: { label: "BC" },
    others: { label: "Others" },
  } satisfies ChartConfig;
  useEffect(() => {
    setCurrentVillage(Object.keys(data)[0]);
  }, [data]);

  useEffect(() => {
    setGenderData([
      { gender: "male", value: data[currentVillage]?.male, fill: "#3b82f6" },
      {
        gender: "female",
        value: data[currentVillage]?.female,
        fill: "#f59e0b",
      },
      {
        gender: "others",
        value: data[currentVillage]?.others,
        fill: "#ef4444",
      },
    ]);
    if (data[currentVillage]?.category)
      setCategoryData(
        Object.keys(data[currentVillage]?.category).map((category) => {
          return {
            category: category,
            value: data[currentVillage]?.category[category],
          };
        })
      );

    // waterStorageData = Object.keys(
    //   data[currentVillage]?.mode_of_water_storage
    // ).map((category) => {
    //   return {
    //     category: category,
    //     value: data[currentVillage]?.mode_of_water_storage[category],
    //   };
    // });

    // waterCollectionData = Object.keys(
    //   data[currentVillage]?.water_collection_type
    // ).map((category) => {
    //   return {
    //     category: category,
    //     value: data[currentVillage]?.water_collection_type[category],
    //   };
    // });

    // cookingData = Object.keys(data[currentVillage]?.used_for_cooking).map(
    //   (category) => {
    //     return {
    //       category: category,
    //       value: data[currentVillage]?.used_for_cooking[category],
    //     };
    //   }
    // );
  }, [data, currentVillage]);

  return (
    <div className="flex flex-col justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center text-4xl font-bold text-amber-600">
        survey analysis
      </span>
      <div className="flex md:px-10 gap-2 w-full">
        <div className="flex items-center gap-2">
          <span>Get Report for </span>
          <SelectVillage
            villages={[...Object.keys(data)]}
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
        {/* <GraphWrapperComponent title="Family members count">
          <BarChartComponent
            chartConfig={familyMembersConfig}
            chartData={data}
            XaxisdataKey="village_name"
            datakeys={["total_members"]}
          />
        </GraphWrapperComponent>
        <GraphWrapperComponent title="Village Wise Aadhaar">
          <BarChartComponent
            chartConfig={aadhaarChatConfig}
            chartData={data}
            XaxisdataKey="village_name"
            datakeys={["with_aadhaar", "without_aadhaar"]}
          />
        </GraphWrapperComponent>
        <GraphWrapperComponent title="Village Wise Ration Card">
          <BarChartComponent
            chartConfig={rationCardConfig}
            chartData={data}
            XaxisdataKey="village_name"
            datakeys={["without_ration"]}
          />
        </GraphWrapperComponent> */}
      </div>
    </div>
  );
}
