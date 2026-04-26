import { ContentCard } from "./ContentCard";
import { motion } from "framer-motion";
import { useState } from "react";
import { LongContentCard } from "./LongContentCard";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { useSidebar } from "@repo/ui";
import { cn } from "@repo/libs";
import { useDashboardFetch } from "@/hooks/react-query-hooks/useDashboardFetch";

export default function DashboardDataList() {
  const { data: response } = useDashboardFetch(); // already cached via maincontentarea.tsx

  if (response && response?.data.length === 0) {
    return <div>"NoContentPresentComp" </div>;
  }

  // function to convert the [] into [[][][]] to render cards in form of Masonry layout
  function RoundRobinConversion(cols: number) {
    const result: dashboardFetchDataType[][] = []; // [][] row col wise
    // put cols according to screen size (cols)
    for (let i = 0; i < cols; i++) result.push([]); // [[], [], []] if col =3
    // traverse the cardsData (backend data) and put col wise
    response?.data.forEach((element, i) => {
      result[i % cols].push(element);
    });
    return result;
  }

  /*  check sidebar is open or not for no. of cols on the dashboard */
  const { open } = useSidebar();

  const [selectedCard, setSelectedCard] =
    useState<null | dashboardFetchDataType>(null);
  const cols = window.innerWidth >= 1000 ? 3 : 2;
  const cardsData = RoundRobinConversion(cols);
  //console.log(cardsData);
  /* dashboard bookmarks cardsData grid */
  return (
    <div className="my-2 flex flex-col gap-10">
      <div
        className={cn(
          "grid gap-4",
          open ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-3",
        )}
      >
        {/* traverse cols- col1 then col2 then col3 */}
        {cardsData.map((cardDataRows, idx) => {
          return (
            <div key={idx} className="space-y-8">
              {cardDataRows.map((cardData) => {
                return (
                  /* traverse all rows on that coln */
                  <motion.div
                    layoutId={cardData.contentTable.id}
                    className="break-inside-avoid"
                  >
                    <ContentCard
                      key={cardData.contentTable.id}
                      cardData={cardData}
                      setSelectedCard={setSelectedCard}
                    />
                  </motion.div>
                );
              })}
            </div>
          );
        })}

        {/* render the card dashboardData on full screen */}
        {selectedCard && (
          <LongContentCard
            selectedCardData={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        )}
      </div>
    </div>
  );
}
