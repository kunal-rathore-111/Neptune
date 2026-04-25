import { ArrowBigLeftDashIcon } from "@repo/icons";
import { cn } from "@repo/libs";
import { animateIconUsingRef, ButtonsClass, type IconHandle } from "@repo/ui";
import { useRef } from "react";
import { useNavigate } from "react-router";

export function BackToDashboardButton() {
  const navigate = useNavigate();
  const AnimateRef = useRef<IconHandle>(null);
  return (
    <button
      className={cn(
        ButtonsClass,
        "flex cursor-pointer gap-2 px-2 py-1 text-xs",
      )}
      {...animateIconUsingRef(AnimateRef)}
      onClick={() => {
        navigate("/user/dashboard");
      }}
    >
      <ArrowBigLeftDashIcon size={18} ref={AnimateRef} /> Back to dashboard
    </button>
  );
}
