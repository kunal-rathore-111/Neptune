import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@repo/libs/utils";

export interface BookTextIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BookTextIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BookTextIcon = forwardRef<BookTextIconHandle, BookTextIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
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
          controls.start("normal");
        }
      },
      [controls, onMouseLeave],
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          width={size}
        >
          {/* Book body */}
          <motion.path
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1.03, 1],
                transition: { duration: 0.7 },
              },
            }}
            d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
          />

          {/* Page line 1 */}
          <motion.path
            animate={controls}
            variants={{
              normal: { x: 0, opacity: 1 },
              animate: {
                x: [0, 2, -2, 0],
                opacity: [1, 0.7, 1],
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                },
              },
            }}
            d="M8 11h8"
          />

          {/* Page line 2 */}
          <motion.path
            animate={controls}
            variants={{
              normal: { x: 0, opacity: 1 },
              animate: {
                x: [0, -2, 2, 0],
                opacity: [1, 0.7, 1],
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                },
              },
            }}
            d="M8 7h6"
          />
        </svg>
      </div>
    );
  },
);

BookTextIcon.displayName = "BookTextIcon";

export { BookTextIcon };
