import { useEffect, useState, useCallback, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { surveyColumns } from "@/components/ui/data-table/survey-columns";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { SurveyRecord } from "@/schema";
import SelectComponent from "@/components/SelectComponent";
import { Download } from "lucide-react";
import { VisibilityState } from "@tanstack/react-table";
import { getUniqueVillageNames } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ALL_VILLAGES = "All Villages";

export default function ReportPage() {
  const [surveyData, setSurveyData] = useState<SurveyRecord[]>([]);
  const [currentVillage, setCurrentVillage] = useState<string>(ALL_VILLAGES);
  const { startLoad, stopLoad } = useLoader();

  const fetchSurveyData = useCallback(async () => {
    try {
      startLoad();
      const { data } = await axiosInstance.get("/surveyData/report");
      setSurveyData(data);
    } catch (err) {
      console.error(err);
    } finally {
      stopLoad();
    }
  }, [startLoad, stopLoad]);

  // Initial fetch
  useEffect(() => {
    fetchSurveyData();
  }, [fetchSurveyData]);

  // Poll for new data every 3s, update only if length changes
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const { data } = await axiosInstance.get("/surveyData/report");
        if (data.length !== surveyData.length) setSurveyData(data);
      } catch (err) {
        console.error(err);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [surveyData.length]);

  const visibleColumns = useMemo<VisibilityState>(() => ({ village_name: true }), []);

  const villageOptions = useMemo(
    () =>
      [
        ALL_VILLAGES,
        ...getUniqueVillageNames(surveyData),
      ].map((village) => ({ value: village, label: village })),
    [surveyData]
  );

  const downloadData = useCallback(async () => {
    try {
      startLoad();
      const params = currentVillage === ALL_VILLAGES ? "" : currentVillage;
      const { data } = await axiosInstance.get(
        `/surveyData/download?village_name=${params}`,
        { maxBodyLength: Infinity, responseType: "blob" }
      );
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([data]));
      link.download = `${currentVillage}.xlsx`;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      stopLoad();
    }
  }, [currentVillage, startLoad, stopLoad]);

  return (
    <div className="flex items-center justify-center m-2 p-2">
      <div className="flex flex-col space-y-3">
        <span className="w-full uppercase text-center md:text-4xl text-2xl font-bold text-amber-600">
          survey report
        </span>
        <div className="flex items-center md:justify-end gap-2 md:w-full">
          <SelectComponent
            values={villageOptions}
            onChange={setCurrentVillage}
            value={currentVillage}
            placeholder="Select Village"
            text="Download Report for "
          />
          <Button
            variant="primary"
            className="flex gap-2 items-center justify-center cursor-pointer"
            onClick={downloadData}
          >
            <Download className="w-5 h-5" /> Download Data
          </Button>
        </div>
        <DataTable
          data={surveyData}
          columns={surveyColumns}
          visibleColumns={visibleColumns}
        />
      </div>
    </div>
  );
}
