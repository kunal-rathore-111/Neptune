import { cn } from "@repo/libs/utils";
import { ArrowBigUpDashIcon } from "@repo/icons/UpArrow";
import { useRef } from "react";
import { ButtonsClass } from "../*utils/styles";
import { animateIconUsingRef, type IconHandle } from "../*utils/IconAnimateRef";

export default function MoveUpButton() {
  const AnimateRef = useRef<IconHandle>(null);
  return (
    <div
      className={cn(ButtonsClass)}
      {...animateIconUsingRef(AnimateRef)}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <ArrowBigUpDashIcon size={20} ref={AnimateRef} />
    </div>
  );
}
