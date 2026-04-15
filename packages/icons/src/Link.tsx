"use client";

import {
  motion,
  useAnimation,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";
import type { ForwardedRef } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@repo/libs/utils";

export interface LinkIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

/* ✅ USE THIS INSTEAD */
interface LinkIconProps extends HTMLMotionProps<"div"> {
  size?: number;
}

/* ================= VARIANTS ================= */

const LINK_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  draw: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.5 },
  },
};

const CONNECT_VARIANTS: Variants = {
  normal: { pathLength: 1 },
  draw: {
    pathLength: [0, 1],
    transition: { duration: 0.4, delay: 0.2 },
  },
};

/* ================= COMPONENT ================= */

const LinkIcon = forwardRef(
  (
    {
      className,
      size = 24,
      onMouseEnter,
      onMouseLeave,
      ...props
    }: LinkIconProps,
    ref: ForwardedRef<LinkIconHandle>,
  ) => {
    const linkControls = useAnimation();
    const connectControls = useAnimation();

    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await linkControls.start("draw");
          await connectControls.start("draw");
        },
        stopAnimation: () => {
          linkControls.start("normal");
          connectControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(async () => {
      if (!isControlledRef.current) {
        await linkControls.start("draw");
        await connectControls.start("draw");
      }
    }, [linkControls, connectControls]);

    const handleMouseLeave = useCallback(() => {
      if (!isControlledRef.current) {
        linkControls.start("normal");
        connectControls.start("normal");
      }
    }, [linkControls, connectControls]);

    return (
      <motion.div
        className={cn(className)}
        onMouseEnter={(e) => {
          handleMouseEnter();
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          handleMouseLeave();
          onMouseLeave?.(e);
        }}
        {...props} // ✅ NOW SAFE
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"
            initial="normal"
            animate={linkControls}
            variants={LINK_VARIANTS}
          />

          <motion.path
            d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"
            initial="normal"
            animate={linkControls}
            variants={LINK_VARIANTS}
          />

          <motion.path
            d="M9 15l6 -6"
            initial="normal"
            animate={connectControls}
            variants={CONNECT_VARIANTS}
          />
        </svg>
      </motion.div>
    );
  },
);

LinkIcon.displayName = "LinkIcon";

export { LinkIcon };
