import { ContentCard } from "./ContentCard";
import { motion } from "framer-motion";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { NoContentPresentComp } from "./NoContentComp";

type DashboardDataListInput = {
  finalDisplayData: dashboardFetchDataType[] | undefined;
};

export default function DashboardDataList({
  finalDisplayData,
}: DashboardDataListInput) {
  if (finalDisplayData && finalDisplayData.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <NoContentPresentComp />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-6">
      {finalDisplayData?.map((cardData) => {
        return (
          <motion.div
            layoutId={cardData.contentTable.id}
            className="break-inside-avoid"
            key={cardData.contentTable.id}
          >
            <ContentCard cardData={cardData} />
          </motion.div>
        );
      })}
    </div>
  );
}
