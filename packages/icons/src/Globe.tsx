"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@repo/libs/utils";

export interface GlobeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GlobeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

/* ================= VARIANTS ================= */

// heart pop (scale in → settle)
const HEART_VARIANT: Variants = {
  normal: {
    scale: 1,
  },
  animate: {
    scale: [0.6, 1.2, 1],
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* ================= COMPONENT ================= */

const GlobeIcon = forwardRef<GlobeIconHandle, GlobeIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.set("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.set("normal");
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn("inline-flex items-center justify-center", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* static globe */}
          <path d="M21 12a9 9 0 1 0 -9.679 8.974" />
          <path d="M3.6 9h16.8" />
          <path d="M3.6 15h6.9" />
          <path d="M11.5 3a17 17 0 0 0 0 18" />
          <path d="M12.5 3a16.983 16.983 0 0 1 2.556 8.136" />

          {/* animated heart */}
          <motion.g
            animate={controls}
            initial="normal"
            variants={HEART_VARIANT}
            style={{ transformOrigin: "18px 18px" }}
          >
            <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296" />
          </motion.g>
        </svg>
      </div>
    );
  },
);

GlobeIcon.displayName = "GlobeIcon";

export { GlobeIcon };
