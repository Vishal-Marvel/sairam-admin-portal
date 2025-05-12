import BarChartComponent from "@/components/BarChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import { ChartConfig } from "@/components/ui/chart";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { generateChartConfig2, generateData } from "@/lib/utils";
import { Schemes } from "@/schema";
import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";

export default function SchemePage() {
  const [schemeData, setSchemeData] = useState<Schemes>();
  const { startLoad, stopLoad } = useLoader();
  const getData = async () => {
    try {
      startLoad();
      const response = await axiosInstance.get("/analytics/schemes");
      setSchemeData(response.data);
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

  return (
    <div className="flex flex-wrap justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center text-4xl font-bold text-amber-600">
        Scheme analysis
      </span>
      {schemeData &&
        Object.keys(schemeData).map((key) => (
          <GraphWrapperComponent
            //@ts-ignore
            title={key.replaceAll("_", " ") + " Scheme Avg Awareness level"}
          >
            <BarChartComponent
              chartConfig={generateChartConfig2()}
              //@ts-ignore
              chartData={generateData(schemeData[key])}
              XaxisdataKey="village_name"
              datakeys={["count"]}
            />
          </GraphWrapperComponent>
        ))}
      {/* <GraphWrapperComponent title="Thozhi Scheme Analysis">
        <BarChartComponent
          chartConfig={chartConfig}
          chartData={generateData(schemeData["thozhi"])}
          XaxisdataKey="village_name"
          datakeys={["count"]}
        />
      </GraphWrapperComponent>
      <GraphWrapperComponent title="Vidiyal Scheme Analysis">
        <BarChartComponent
          chartConfig={chartConfig}
          chartData={generateData(schemeData["vidiyal"])}
          XaxisdataKey="village_name"
          datakeys={["count"]}
        />
      </GraphWrapperComponent>
      <GraphWrapperComponent title="sirpiyin Scheme Analysis">
        <BarChartComponent
          chartConfig={chartConfig}
          chartData={generateData(schemeData["sirpiyin"])}
          XaxisdataKey="village_name"
          datakeys={["count"]}
        />
      </GraphWrapperComponent>
      <GraphWrapperComponent title="kaalai unavu Scheme Analysis">
        <BarChartComponent
          chartConfig={chartConfig}
          chartData={generateData(schemeData["kaalai"])}
          XaxisdataKey="village_name"
          datakeys={["count"]}
        />
      </GraphWrapperComponent>
      <GraphWrapperComponent title="namma school Scheme Analysis">
        <BarChartComponent
          chartConfig={chartConfig}
          chartData={generateData(schemeData["namma"])}
          XaxisdataKey="village_name"
          datakeys={["count"]}
        />
      </GraphWrapperComponent>
      <GraphWrapperComponent title="namakku naame Scheme Analysis">
        <BarChartComponent
          chartConfig={chartConfig}
          chartData={generateData(schemeData["namakku"])}
          XaxisdataKey="village_name"
          datakeys={["count"]}
        />
      </GraphWrapperComponent> */}
    </div>
  );
}
