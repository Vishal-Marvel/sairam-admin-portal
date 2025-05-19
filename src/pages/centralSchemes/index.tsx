import BarChartComponent from "@/components/BarChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import { ChartConfig } from "@/schema";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { CentralSchemes } from "@/schema";
import { useEffect, useState } from "react";
import { cn, generateData } from "@/lib/utils";

export default function CentralSchemePage() {
  const [schemeData, setSchemeData] = useState<CentralSchemes>();
  const { startLoad, stopLoad } = useLoader();
  const [currentScheme, setCurrentScheme] = useState<string>("All Schemes");

  const getData = async () => {
    try {
      startLoad();
      const response = await axiosInstance.get("/analytics/centralSchemes");
      setSchemeData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoad();
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const beneficiariesConfig = {
    count: {
      label: "Beneficiaries",
      color: "#666666",
    },
  } satisfies ChartConfig;

  const analysisConfig = {
    count: {
      label: "Average Awareness Level",
      color: "#66b666",
    },
  } satisfies ChartConfig;
  return (
    <div className="flex flex-wrap justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center text-4xl font-bold text-amber-600">
        Scheme analysis
      </span>
      {/* <div className="flex items-center w-[90%] gap-2">
        <span>Get Analysis for </span>
        <SelectComponent
          values={[
            "All Schemes",
            ...Object.keys(schemeData || {}).map((key) =>
              key.replace(/_/g, " ")
            ),
          ]}
          onChange={(val) => {
            setCurrentScheme(val);
          }}
          value={currentScheme}
          placeholder="Select Scheme"
        />
      </div> */}
      {schemeData &&
        Object.keys(schemeData).map((key) => (
          <div
            className={cn(
              "w-full flex flex-col items-center justify-center gap-5",
              key.replace(/_/g, " ") === currentScheme ||
                currentScheme === "All Schemes"
                ? "block"
                : "hidden"
            )}
            key={key.replace(/_/g, " ")}
          >
            <span className="capitalize font-bold text-xl self-center">
              {key.replace(/_/g, " ") + " Scheme Analysis"}
            </span>
            <div className="flex flex-wrap gap-5 justify-center">
              <GraphWrapperComponent
                title={key.replace(/_/g, " ") + " - Beneficiaries"}
              >
                <BarChartComponent
                  chartConfig={beneficiariesConfig}
                  chartData={generateData(
                    schemeData?.[key as keyof CentralSchemes],
                    "beneficiaries"
                  )}
                  XaxisdataKey="village_name"
                  datakeys={["count"]}
                />
              </GraphWrapperComponent>
              <GraphWrapperComponent
                title={key.replace(/_/g, " ") + " - Avg Awareness level"}
              >
                <BarChartComponent
                  chartConfig={analysisConfig}
                  chartData={generateData(
                    schemeData?.[key as keyof CentralSchemes],
                    "avg_awareness_level"
                  )}
                  XaxisdataKey="village_name"
                  datakeys={["count"]}
                />
              </GraphWrapperComponent>
            </div>
          </div>
        ))}
    </div>
  );
}
