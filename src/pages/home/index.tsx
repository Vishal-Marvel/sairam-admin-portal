import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosConfig";
import type { Analytics, ChartConfig } from "@/schema";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import BarChartComponent from "@/components/BarChartComponent";
import StackedBarChartComponent from "@/components/StackedBarChartComponent";
import SelectComponent from "@/components/SelectComponent";
import { useLoader } from "@/hooks/use-loader";
import {
  generateChartConfigForVillage,
  getChartDataForDateRange,
} from "@/lib/utils";

const chartConfigs = {
  aadhaar: {
    with_aadhaar: { label: "Having Aadhaar Card", color: "#8bb216" },
    without_aadhaar: { label: "Not Having Aadhaar Card", color: "#3b82f6" },
  } satisfies ChartConfig,
  survey: {
    total_surveys: { label: "Survey Count", color: "#3b82f6" },
  } satisfies ChartConfig,
  familyMembers: {
    total_members: { label: "Family Members Count", color: "#8bb216" },
  } satisfies ChartConfig,
  rationCard: {
    without_ration: { label: "Without Ration Card", color: "#dbb256" },
    total_surveys: { label: "Total House Hold", color: "#3b82f6" },
  } satisfies ChartConfig,
};

const dateRangeSelectorList = [
  { label: "Last Week", value: "last_week" },
  { label: "Last Month", value: "last_month" },
  { label: "Last Quarter", value: "last_quarter" },
  { label: "Last Year", value: "last_year" },
];

function HomePage() {
  const [data, setData] = useState<Analytics>();
  const [responseData, setResponseData] = useState<Analytics>();
  const [dataKeysForDate, setDataKeysForDate] = useState<string[]>([]);
  const [chartDataForDate, setChartDataForDate] = useState<any[]>([]);
  const [chartConfigForDate, setChartConfigForDate] = useState<ChartConfig>({});
  const [selectedDateRange, setSelectedDateRange] = useState("last_week");
  const { startLoad, stopLoad } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!responseData) return;
    setData({
      ...responseData,
      villageSummary: responseData.villageSummary.map((village) => ({
        ...village,
        village_name: village.village_name.split("(")[0].trim(),
      })),
    });
  }, [responseData]);

  useEffect(() => {
    if (!data) return;
    setChartConfigForDate(
      generateChartConfigForVillage(
        data.villageSummary.map((summary) => summary.village_name)
      )
    );
  }, [data]);

  useEffect(() => {
    if (!data?.surveyCountByDate) return;
    const { dataKeys, chartData } = getChartDataForDateRange(
      data.surveyCountByDate,
      selectedDateRange
    );
    setDataKeysForDate(dataKeys);
    setChartDataForDate(chartData);
  }, [data, selectedDateRange]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center text-4xl font-bold text-amber-600">
        overall survey analysis
      </span>

      <GraphWrapperComponent title="Village wise Survey count">
        <BarChartComponent
          chartConfig={chartConfigs.survey}
          chartData={data?.villageSummary!}
          XaxisdataKey="village_name"
          datakeys={["total_surveys"]}
        />
      </GraphWrapperComponent>

      <GraphWrapperComponent title="Village wise Family members count">
        <BarChartComponent
          chartConfig={chartConfigs.familyMembers}
          chartData={data?.villageSummary!}
          XaxisdataKey="village_name"
          datakeys={["total_members"]}
        />
      </GraphWrapperComponent>

      <GraphWrapperComponent
        title={
          `${
            dateRangeSelectorList.find((item) => item.value === selectedDateRange)
              ?.label
          } Date Wise Survey Analysis`
        }
        width="md:w-[55rem] w-full"
      >
        <div className="flex flex-col items-end">
          <SelectComponent
            values={dateRangeSelectorList}
            placeholder="Select Date Range"
            value={selectedDateRange}
            onChange={setSelectedDateRange}
          />
          <StackedBarChartComponent
            chartConfig={chartConfigForDate}
            chartData={chartDataForDate}
            XaxisdataKey="category"
            datakeys={dataKeysForDate}
          />
        </div>
      </GraphWrapperComponent>

      <GraphWrapperComponent title="Village Wise Aadhaar Data">
        <BarChartComponent
          chartConfig={chartConfigs.aadhaar}
          chartData={data?.villageSummary!}
          XaxisdataKey="village_name"
          datakeys={["with_aadhaar", "without_aadhaar"]}
        />
      </GraphWrapperComponent>

      <GraphWrapperComponent title="Village Wise Ration Card">
        <BarChartComponent
          chartConfig={chartConfigs.rationCard}
          chartData={data?.villageSummary!}
          XaxisdataKey="village_name"
          datakeys={["total_surveys", "without_ration"]}
        />
      </GraphWrapperComponent>
    </div>
  );
}

export default HomePage;
