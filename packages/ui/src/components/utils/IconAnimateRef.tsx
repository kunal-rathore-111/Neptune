import type { RefObject } from "react";

export type IconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export function animateIconUsingRef(AnimateRef: RefObject<IconHandle | null>) {
  return {
    onMouseEnter: () => {
      // console.log("hovered");
      AnimateRef.current?.startAnimation();
    },
    onMouseLeave: () => {
      AnimateRef.current?.stopAnimation();
    },
  };
}
