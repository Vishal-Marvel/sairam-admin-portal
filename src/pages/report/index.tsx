import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { DataTable } from "@/components/ui/data-table";
import { surveyColumns } from "@/components/ui/data-table/survey-columns";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { SurveyDates, SurveyRecord } from "@/schema";
import SelectComponent from "@/components/SelectComponent";
import { Download } from "lucide-react";
import { VisibilityState } from "@tanstack/react-table";
import { getUniqueVillageNames } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { onValue, ref } from "firebase/database";
import { database } from "@/lib/firebase";
import { toast } from "sonner";

const ALL_VILLAGES = "All Villages";

export default function ReportPage() {
  const [surveyData, setSurveyData] = useState<SurveyRecord[]>([]);
  const [surveyDates, setSurveyDates] = useState<SurveyDates[]>([]);
  const [currentVillage, setCurrentVillage] = useState<string>(ALL_VILLAGES);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const { startLoad, stopLoad } = useLoader();

  const fetchSurveyDates = useCallback(async () => {
    try {
      startLoad();
      console.log("Fetching survey dates...", new Date());
      const { data } = await axiosInstance.get("/surveyData/date-wise-count");
      setSurveyDates(data);
    } catch (err) {
      console.error(err);
    } finally {
      stopLoad();
    }
  }, [startLoad, stopLoad]);

  const fetchSurveyData = useCallback(async () => {
    try {
      startLoad();
      console.log("Fetching survey data...", new Date());
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
    fetchSurveyDates();
  }, [fetchSurveyData, fetchSurveyDates]);

  // Track previous value without causing re-renders
  const previousValueRef = useRef(null);

  useEffect(() => {
    const dbRef = ref(database, "survey_data");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const currentValue = snapshot.val();
      if (currentValue !== previousValueRef.current) {
        previousValueRef.current = currentValue;
        fetchSurveyData();
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, [fetchSurveyData]);

  const visibleColumns = useMemo<VisibilityState>(
    () => ({ village_name: true }),
    []
  );

  const villageOptions = useMemo(
    () =>
      [ALL_VILLAGES, ...getUniqueVillageNames(surveyData)].map((village) => ({
        value: village,
        label: village,
      })),
    [surveyData]
  );

  const downloadData = useCallback(async () => {
    try {
      if (!selectedDate) {
        toast.error("Please select a date to download the report.");
        return;
      }
      startLoad();

      const params = currentVillage === ALL_VILLAGES ? "" : currentVillage;
      const { data } = await axiosInstance.get(
        `/surveyData/download?village_name=${params}&date=${selectedDate}`,
        { maxBodyLength: Infinity, responseType: "blob" }
      );
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([data]));
      link.download = `${currentVillage}_${selectedDate}.xlsx`;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      stopLoad();
    }
  }, [currentVillage, startLoad, stopLoad, selectedDate]);

  return (
    <div className="flex items-center justify-center m-2 p-2">
      <div className="flex flex-col space-y-3">
        <span className="w-full uppercase text-center md:text-4xl text-2xl font-bold text-amber-600">
          survey report
        </span>
        <div className="flex items-center md:justify-end justify-center gap-2 md:w-full">
          <SelectComponent
            values={villageOptions}
            onChange={setCurrentVillage}
            value={currentVillage}
            placeholder="Select Village"
            text="Download Report for "
          />
          <SelectComponent
            values={surveyDates.map((date) => ({
              value: date.date,
              label: `${date.date} (${date.total})`,
            }))}
            onChange={setSelectedDate}
            value={selectedDate}
            placeholder="Select Date"
            text="for Date"
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
