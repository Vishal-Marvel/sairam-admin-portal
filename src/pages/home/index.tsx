import { axiosInstance } from "@/lib/axiosConfig";
import type { Analytics, ChartConfig } from "@/schema";
import React, { useEffect, useState } from "react";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import { useLoader } from "@/hooks/use-loader";
import Problems from "./Problems";
import BarChartComponent from "@/components/BarChartComponent";
import { generateChartConfig, transformItem } from "@/lib/utils";

function HomePage() {
  const [data, setdata] = useState<Analytics | null>(null);
  const [responseData, setResponseData] = useState<Analytics | null>(null);
  const { startLoad, stopLoad } = useLoader();
  const getData = async () => {
    try {
      startLoad();
      const response = await axiosInstance.get("/analytics");
      setResponseData(response.data);
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
      label: "Having Aadhaar Card",
      color: "#8bb216",
    },
    without_aadhaar: {
      label: "Not Having Aadhaar Card",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  const surveyConfig = {
    total_surveys: {
      label: "Survey Count",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  const surveyDateConfig = {
    total_surveys: {
      label: "Survey Date",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  const familyMembersConfig = {
    total_members: {
      label: "Family Members Count",
      color: "#8bb216",
    },
  } satisfies ChartConfig;
  const rationCardConfig = {
    without_ration: {
      label: "Without Ration Card",
      color: "#dbb256",
    },
    total_surveys: {
      label: "Total House Hold",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    if (!responseData) return;

    setdata({
      ...responseData,
      villageSummary: responseData.villageSummary.map((village) => ({
        ...village,
        village_name: village.village_name.split("(")[0].trim(),
      })),
    });
  }, [responseData]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center text-4xl font-bold text-amber-600">
        overall survey analysis
      </span>
      <GraphWrapperComponent title="Village wise Survey count">
        <BarChartComponent
          chartConfig={surveyConfig}
          chartData={data?.villageSummary}
          XaxisdataKey="village_name"
          datakeys={["total_surveys"]}
        />
      </GraphWrapperComponent>
      <GraphWrapperComponent title="Village wise Family members count">
        <BarChartComponent
          chartConfig={familyMembersConfig}
          chartData={data?.villageSummary}
          XaxisdataKey="village_name"
          datakeys={["total_members"]}
        />
      </GraphWrapperComponent>
      <GraphWrapperComponent title="Village Wise Aadhaar Data">
        <BarChartComponent
          chartConfig={aadhaarChatConfig}
          chartData={data?.villageSummary}
          XaxisdataKey="village_name"
          datakeys={["with_aadhaar", "without_aadhaar"]}
        />
      </GraphWrapperComponent>
      <GraphWrapperComponent title="Village Wise Ration Card">
        <BarChartComponent
          chartConfig={rationCardConfig}
          chartData={data?.villageSummary}
          XaxisdataKey="village_name"
          datakeys={["total_surveys", "without_ration"]}
        />
      </GraphWrapperComponent>
      <GraphWrapperComponent title="Date Wise Analysis">
        <BarChartComponent
          chartConfig={generateChartConfig(data?.surveyCountByDate ?? {})}
          chartData={Object.keys(data?.surveyCountByDate ?? {}).map((key) => {
            return { category: key, value: data?.surveyCountByDate[key] };
          })}
          XaxisdataKey="category"
          datakeys={["value"]}
        />
      </GraphWrapperComponent>
      {/* <div className="w-[90%]">
        <Problems problems={data?.problems ?? []} />
      </div> */}
    </div>
  );
}

export default HomePage;
