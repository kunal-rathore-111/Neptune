import { ContentCard } from "./ContentCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LongContentCard } from "./LongContentCard";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { useSidebar } from "@repo/ui";
import { cn } from "@repo/libs";
import { useDashboardFetch } from "@/hooks/react-query-hooks/useDashboardFetch";
import LoadingPage from "@/Pages/Loading";

export default function DashboardDataList() {
  const { data: response, isLoading } = useDashboardFetch(); // already cached via maincontentarea.tsx

  const getCols = (width: number, open: boolean) => {
    if (open) {
      // sidebar open, less space
      if (width >= 1400) return 3;
      if (width >= 1090) return 2;
      return 1;
    } else {
      if (width >= 1500) return 4;
      if (width >= 1100) return 3;
      if (width >= 600) return 2;
      return 1;
    }
  };
  const [selectedCard, setSelectedCard] =
    useState<null | dashboardFetchDataType>(null);

  /*  check sidebar is open or not for no. of cols on the dashboard */
  const { open } = useSidebar();

  const [cols, setCols] = useState<number>(getCols(window.innerWidth, open));

  useEffect(() => {
    const handleResizeEvent = () => {
      //  console.error(window.innerWidth);
      const newCols = getCols(window.innerWidth, open);
      setCols((prev) => (prev === newCols ? prev : newCols)); // it helps to avoid unnecessary renders, cause if width change even one pixel it will render and frontend will lag
    };
    handleResizeEvent(); // updates when open changes
    window.addEventListener("resize", handleResizeEvent); // when window resize call handleResizeEvent
    return () => {
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, [open]);

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

  if (isLoading) return <LoadingPage />;
  if (response && response?.data.length === 0) {
    return <div>"NoContentPresentComp" </div>;
  }

  const cardsData = RoundRobinConversion(cols);

  return (
    <div className="my-2 flex flex-col items-center gap-10">
      <div
        className={cn("grid gap-10", {
          "grid-cols-1": cols === 1,
          "grid-cols-2": cols === 2,
          "grid-cols-3": cols === 3,
          "grid-cols-4": cols === 4,
        })}
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
                    key={cardData.contentTable.id}
                  >
                    <ContentCard
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
