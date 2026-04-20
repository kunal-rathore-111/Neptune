import { ContentCard } from "./ContentCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LongContentCard } from "./LongContentCard";
import type { dashboardFetchDataType } from "@/Types/dashboard";

export default function DashboardComp({
  dashboardData,
}: {
  dashboardData: dashboardFetchDataType[];
}) {
  /* dashboard bookmarks cardsData grid */
  const [selectedCard, setSelectedCard] =
    useState<null | dashboardFetchDataType>(null);
  const cardsData = dashboardData;

  useEffect(() => {
    console.error("dashboardData- ", dashboardData);
  }, [dashboardData]);

  return (
    <div className="my-2 flex flex-col gap-10">
      <div className="my-4 grid grid-cols-2 gap-8 lg:grid-cols-3">
        {cardsData.map((cardData) => {
          return (
            <motion.div layoutId={cardData.contentTable.id}>
              <ContentCard
                key={cardData.contentTable.id}
                cardData={cardData}
                setSelectedCard={setSelectedCard}
              />
            </motion.div>
          );
        })}

        {/* render the card dashboardData on full screen */}
        {selectedCard && (
          <LongContentCard
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        )}
      </div>
    </div>
  );
}
