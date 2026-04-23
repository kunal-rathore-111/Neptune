import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { LongCardOutlineComp } from "@/components/sharedContent/LongCardOutline";
import { XIcon } from "@repo/icons";

export function LongContentCard({
  selectedCardData,
  setSelectedCard,
}: {
  selectedCardData: dashboardFetchDataType;
  setSelectedCard: Dispatch<SetStateAction<dashboardFetchDataType | null>>;
}) {
  /* effect to toggle the scroll of main page on card open and close */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <LongCardOutlineComp
      selectedCardData={selectedCardData}
      Icon={XIcon}
      setSelectedCard={setSelectedCard}
    />
  );
}
