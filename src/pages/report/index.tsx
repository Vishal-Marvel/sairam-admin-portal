import { DataTable } from "@/components/ui/data-table";
import { surveyColumns } from "@/components/ui/data-table/survey-columns";
import { useLoader } from "@/hooks/use-loader";
import { axiosInstance } from "@/lib/axiosConfig";
import { SurveyRecord } from "@/schema";
import { useEffect, useState } from "react";
import SelectComponent from "@/components/SelectComponent";
import { Download } from "lucide-react";
import { VisibilityState } from "@tanstack/react-table";
import { getUniqueVillageNames } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ReportPage() {
  const [surveyData, setSurveyData] = useState<SurveyRecord[]>([]);
  const [currentVillage, setCurrentVillage] = useState<string>("All Villages");

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
  const refreshData = async () => {
    try {
      const response = await axiosInstance.get("/surveyData/report");
      if (response.data.length == surveyData.length) return;
      setSurveyData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [surveyData]);

  const visibleColumns: VisibilityState = {
    village_name: true,
  };

  const downloadData = async () => {
    try {
      if (currentVillage == "") {
        toast("Please select a village");
        return;
      }
      startLoad();

      const response = await axiosInstance.get(
        "/surveyData/download?village_name=" +
          (currentVillage == "All Villages" ? "" : currentVillage),
        {
          maxBodyLength: Infinity,
          responseType: "blob",
        }
      );

      //console.log(JSON.stringify(response.data));
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([response.data]));
      link.download = `${currentVillage}.xlsx`;
      link.click();
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
        <div className="flex items-center justify-end gap-2 w-full">
          <SelectComponent
            values={["All Villages", ...getUniqueVillageNames(surveyData)].map(
              (village) => ({ value: village, label: village })
            )}
            onChange={setCurrentVillage}
            value={currentVillage}
            placeholder="Select Village"
            text="Download Report for "
          />
          <Button
            variant={"primary"}
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
