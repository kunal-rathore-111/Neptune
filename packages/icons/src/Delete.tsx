"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@repo/libs/utils";

export interface DeleteIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface DeleteIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

/* ================= VARIANTS ================= */

// lid → slight lift (trigger)
const LID: Variants = {
  normal: { y: 0 },
  animate: {
    y: [-2, 0],
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// content → drop + fade (delete action)
const CONTENT: Variants = {
  normal: { y: 0, opacity: 1 },
  animate: {
    y: [0, 4],
    opacity: [1, 0],
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/* ================= COMPONENT ================= */

const DeleteIcon = forwardRef<DeleteIconHandle, DeleteIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const lidControls = useAnimation();
    const contentControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await lidControls.start("animate");
          contentControls.start("animate");
        },
        stopAnimation: () => {
          lidControls.set("normal");
          contentControls.set("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          await lidControls.start("animate");
          contentControls.start("animate");
        }
      },
      [lidControls, contentControls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          lidControls.set("normal");
          contentControls.set("normal");
        }
      },
      [lidControls, contentControls, onMouseLeave],
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
          {/* lid */}
          <motion.path
            d="M4 7h16"
            animate={lidControls}
            initial="normal"
            variants={LID}
          />

          {/* handle */}
          <motion.path
            d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
            animate={lidControls}
            initial="normal"
            variants={LID}
          />

          {/* bin */}
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />

          {/* content */}
          <motion.path
            d="M10 11v6"
            animate={contentControls}
            initial="normal"
            variants={CONTENT}
          />
          <motion.path
            d="M14 11v6"
            animate={contentControls}
            initial="normal"
            variants={CONTENT}
          />
        </svg>
      </div>
    );
  },
);

DeleteIcon.displayName = "DeleteIcon";

export { DeleteIcon };
