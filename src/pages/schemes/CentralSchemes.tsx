import BarChartComponent from "@/components/BarChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import { ChartConfig } from "@/schema";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { CentralSchemes } from "@/schema";
import { useEffect, useState } from "react";
import { cn, generateData } from "@/lib/utils";
import Schemes from "./Schemes";

export default function CentralSchemePage() {
  const [schemeData, setSchemeData] = useState<CentralSchemes>();
  const { startLoad, stopLoad } = useLoader();

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

  return (
    <div className="flex flex-wrap justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center text-4xl font-bold text-amber-600">
        central Scheme analysis
      </span>

      {schemeData && <Schemes schemeData={schemeData} />}
    </div>
  );
}
