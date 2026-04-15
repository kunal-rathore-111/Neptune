"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@repo/libs/utils";

export interface CodeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CodeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

/* ================= VARIANTS ================= */

// <
const LEFT_VARIANT: Variants = {
  normal: {
    x: 0,
    opacity: 1,
  },
  animate: {
    x: [-10, 0],
    opacity: [0, 1],
    transition: {
      duration: 0.4,
    },
  },
};

// >
const RIGHT_VARIANT: Variants = {
  normal: {
    x: 0,
    opacity: 1,
  },
  animate: {
    x: [10, 0],
    opacity: [0, 1],
    transition: {
      duration: 0.4,
    },
  },
};

/* ================= COMPONENT ================= */

const CodeIcon = forwardRef<CodeIconHandle, CodeIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const leftControls = useAnimation();
    const rightControls = useAnimation();

    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await leftControls.start("animate");
          await rightControls.start("animate");
        },
        stopAnimation: () => {
          leftControls.start("normal");
          rightControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          await leftControls.start("animate");
          await rightControls.start("animate");
        }
      },
      [leftControls, rightControls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          leftControls.start("normal");
          rightControls.start("normal");
        }
      },
      [leftControls, rightControls, onMouseLeave],
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* < */}
          <motion.path
            animate={leftControls}
            d="M7 8l-4 4l4 4"
            variants={LEFT_VARIANT}
          />

          {/* > */}
          <motion.path
            animate={rightControls}
            d="M17 8l4 4l-4 4"
            variants={RIGHT_VARIANT}
          />

          {/* / (static) */}
          <path d="M14 4l-4 16" />
        </svg>
      </div>
    );
  },
);

CodeIcon.displayName = "CodeIcon";

export { CodeIcon };
