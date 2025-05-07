import BarChartComponent from "@/components/BarChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import { ChartConfig } from "@/components/ui/chart";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { Analytics, VillageSummary } from "@/schema";
import React, { useEffect, useState } from "react";
import SelectVillage from "../report/SelectVillage";

export default function AnalysisPage() {
  const [data, setdata] = useState<VillageSummary[]>([]);
  const { startLoad, stopLoad } = useLoader();
  const [currentVillage, setCurrentVillage] = useState<string>("");
  const changeVillage = (village: string) => {
    setCurrentVillage(village);
  };

  const getData = async () => {
    try {
      startLoad();
      const response = await axiosInstance.get("/analytics");
      setdata(response.data.villageSummary);
      console.log(response.data.villageSummary);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoad();
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const aadhaarChatConfig = {
    with_aadhaar: {
      label: "Having Aadhaar",
      color: "var(--chart-1)",
    },
    without_aadhaar: {
      label: "Not Having Aadhaar",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const surveyConfig = {
    total_surveys: {
      label: "Survey Count",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;
  const familyMembersConfig = {
    total_members: {
      label: "Members Count",
      color: "#8bb216",
    },
  } satisfies ChartConfig;
  const rationCardConfig = {
    without_ration: {
      label: "Without Ration Card",
      color: "#dbb256",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center text-4xl font-bold text-amber-600">
        survey analysis
      </span>
      <div className="flex md:px-10 gap-2 w-full">
        <div className="flex items-center gap-2">
          <span>Get Report for </span>
          <SelectVillage
            villages={["All Villages", ...data.map((v) => v.village_name)]}
            onChange={changeVillage}
            value={currentVillage}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5">
        <GraphWrapperComponent title="Survey count">
          <BarChartComponent
            chartConfig={surveyConfig}
            chartData={data}
            XaxisdataKey="village_name"
            datakeys={["total_surveys"]}
          />
        </GraphWrapperComponent>
        <GraphWrapperComponent title="Family members count">
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
        </GraphWrapperComponent>
      </div>
    </div>
  );
}
