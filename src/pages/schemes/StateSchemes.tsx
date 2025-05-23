import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { StateSchemes } from "@/schema";
import { useEffect, useState, useCallback } from "react";
import Schemes from "./Schemes";

export default function StateSchemePage() {
  const [schemeData, setSchemeData] = useState<StateSchemes>();
  const { startLoad, stopLoad } = useLoader();

  const getData = useCallback(async () => {
    startLoad();
    try {
      const { data } = await axiosInstance.get<StateSchemes>("/analytics/stateSchemes");
      setSchemeData(data);
    } catch (err) {
      console.error(err);
    } finally {
      stopLoad();
    }
  }, [startLoad, stopLoad]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-5 m-5">
      <span className="w-full uppercase text-center text-4xl font-bold text-amber-600">
        State Scheme analysis
      </span>
      {schemeData && <Schemes schemeData={schemeData} />}
    </div>
  );
}
