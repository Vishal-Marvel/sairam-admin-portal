import { DataTable } from "@/components/ui/data-table";
import { surveyColumns } from "@/components/ui/data-table/survey-columns";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { SurveyRecord, VillageGroupedData } from "@/schema";
import { useEffect, useState } from "react";
import SelectVillage from "./SelectVillage";
import { Download } from "lucide-react";

export default function ReportPage() {
  const [surveyData, setSurveyData] = useState<VillageGroupedData>();
  const [currentVillage, setCurrentVillage] = useState<string>("");
  const [currentVillageData, setCurrentVillageData] = useState<SurveyRecord[]>(
    []
  );
  const { startLoad, stopLoad } = useLoader();
  const getData = async () => {
    try {
      startLoad();
      const response = await axiosInstance.get("/surveyData/report");
      setSurveyData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoad();
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (surveyData) {
      console.log(Object.keys(surveyData)[0]);
      setCurrentVillage(Object.keys(surveyData)[0]);
      setCurrentVillageData(Object.values(surveyData)[0]);
    }
  }, [surveyData]);

  const changeVillage = (village: string) => {
    setCurrentVillage(village);
    setCurrentVillageData(surveyData?.[village] || []);
  };

  const downloadData = async () => {
    try {
      startLoad();

      axiosInstance
        .get("/surveyData/download?village_name=" + currentVillage, {
          maxBodyLength: Infinity,
          responseType: "blob",
        })
        .then((response) => {
          //console.log(JSON.stringify(response.data));
          const link = document.createElement("a");
          link.href = URL.createObjectURL(new Blob([response.data]));
          link.download = `${currentVillage}.xlsx`;
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    } finally {
      stopLoad();
    }
  };
  return (
    <div className="flex items-center justify-center m-2 p-2 flex-col space-y-3">
      <div className="flex flex-col space-y-3">
        <span className="uppercase text-2xl font-bold w-full text-center">
          survey report
        </span>
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2">
            <span>Get Report for </span>
            <SelectVillage
              villages={Object.keys(surveyData || {})}
              onChange={changeVillage}
              value={currentVillage}
            />
          </div>
          <span
            className="flex gap-2 items-center justify-center cursor-pointer"
            onClick={downloadData}
          >
            <Download className="w-5 h-5" /> Download Data
          </span>
        </div>
        <DataTable data={currentVillageData} columns={surveyColumns} />
      </div>
    </div>
  );
}
