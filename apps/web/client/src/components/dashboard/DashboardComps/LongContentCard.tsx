import { useEffect } from "react";
import { LongCardOutlineComp } from "@/components/sharedContent/LongCardOutline";
import { XIcon } from "@repo/icons";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export function LongContentCard({}) {
  const selectedCardData = useSelector(
    (state: RootState) => state.ui.longSelectedCard,
  );

  /* effect to toggle the scroll of main page on card open and close */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {selectedCardData && (
        <LongCardOutlineComp selectedCardData={selectedCardData} Icon={XIcon} />
      )}
    </>
  );
}
