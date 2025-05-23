import BarChartComponent from "@/components/BarChartComponent";
import GraphWrapperComponent from "@/components/GraphWrapperComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, generateData } from "@/lib/utils";
import { CentralSchemes, ChartConfig, StateSchemes } from "@/schema";
import React from "react";

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
const Schemes = ({
  schemeData,
}: {
  schemeData: StateSchemes | CentralSchemes;
}) => {
  return (
    <Accordion
      
      type="multiple"
      className="md:w-[90%] w-full"
      defaultValue={[Object.keys(schemeData)[0].replace(/_/g, " ")]}
    >
      {schemeData &&
        Object.keys(schemeData).map((key) => (
          <AccordionItem value={key.replace(/_/g, " ")} key={key}>
            <AccordionTrigger className="capitalize font-bold text-xl self-center">
              {key.replace(/_/g, " ") + " Scheme Analysis"}
            </AccordionTrigger>
            <AccordionContent className="flex flex-wrap gap-5 justify-center">
              <GraphWrapperComponent
                title={key.replace(/_/g, " ") + " - Beneficiaries"}
              >
                <BarChartComponent
                  chartConfig={beneficiariesConfig}
                  chartData={generateData(
                    schemeData?.[key as keyof (StateSchemes | CentralSchemes)],
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
                    schemeData?.[key as keyof (StateSchemes | CentralSchemes)],
                    "avg_awareness_level"
                  )}
                  XaxisdataKey="village_name"
                  datakeys={["count"]}
                />
              </GraphWrapperComponent>
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
};

export default Schemes;
