import React from "react";
import BarChartComponent from "@/components/BarChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateData } from "@/lib/utils";
import { CentralSchemes, ChartConfig, StateSchemes } from "@/schema";

const chartConfigs: Record<string, ChartConfig> = {
  beneficiaries: {
    count: {
      label: "Beneficiaries",
      color: "#666666",
    },
  },
  awareness: {
    count: {
      label: "Average Awareness Level",
      color: "#66b666",
    },
  },
};

type SchemesProps = {
  schemeData: StateSchemes | CentralSchemes;
};

const getSchemeTitle = (key: string) => key.replace(/_/g, " ");

const Schemes: React.FC<SchemesProps> = ({ schemeData }) => {
  const schemeKeys = Object.keys(schemeData);
  const firstSchemeTitle = getSchemeTitle(schemeKeys[0]);

  return (
    <Accordion
      type="multiple"
      className="md:w-[90%] w-full"
      defaultValue={[firstSchemeTitle]}
    >
      {schemeKeys.map((key) => {
        const schemeTitle = getSchemeTitle(key);
        const data = schemeData[key as keyof (StateSchemes | CentralSchemes)];

        return (
          <AccordionItem value={schemeTitle} key={key}>
            <AccordionTrigger className="capitalize font-bold text-xl self-center">
              {schemeTitle} Scheme Analysis
            </AccordionTrigger>
            <AccordionContent className="flex flex-wrap gap-5 justify-center">
              <GraphWrapperComponent title={`${schemeTitle} - Beneficiaries`}>
                <BarChartComponent
                  chartConfig={chartConfigs.beneficiaries}
                  chartData={generateData(data, "beneficiaries")}
                  XaxisdataKey="village_name"
                  datakeys={["count"]}
                />
              </GraphWrapperComponent>
              <GraphWrapperComponent title={`${schemeTitle} - Avg Awareness level`}>
                <BarChartComponent
                  chartConfig={chartConfigs.awareness}
                  chartData={generateData(data, "avg_awareness_level")}
                  XaxisdataKey="village_name"
                  datakeys={["count"]}
                />
              </GraphWrapperComponent>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Schemes;
