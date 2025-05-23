import { useEffect, useState } from "react";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { CentralSchemes } from "@/schema";
import Schemes from "./Schemes";

export default function CentralSchemePage() {
  const [schemeData, setSchemeData] = useState<CentralSchemes>();
  const { startLoad, stopLoad } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      startLoad();
      try {
        const { data } = await axiosInstance.get("/analytics/centralSchemes");
        setSchemeData(data);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoad();
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center text-4xl font-bold text-amber-600">
        Central Scheme Analysis
      </span>
      {schemeData && <Schemes schemeData={schemeData} />}
    </div>
  );
}
