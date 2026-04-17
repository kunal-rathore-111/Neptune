'use client';

import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from '@repo/libs';

export interface BrowserIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BrowserIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

/* ================= VARIANTS ================= */

// globe → comes after www
const GLOBE_VARIANT: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (i: number) => ({
    pathLength: [0, 1],
    opacity: [0.4, 1],
    transition: {
      delay: 0.15 * i + 0.45, // starts after www
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

// www → first
const WWW_VARIANT: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (i: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      delay: 0.15 * i,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

/* ================= COMPONENT ================= */

const BrowserIcon = forwardRef<BrowserIconHandle, BrowserIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.set('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start('animate');
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.set('normal');
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn('inline-flex items-center justify-center', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          {/* www first */}
          <motion.path
            d="M2 10l1 4l1.5 -4l1.5 4l1 -4"
            animate={controls}
            initial="normal"
            variants={WWW_VARIANT}
            custom={0}
          />
          <motion.path
            d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4"
            animate={controls}
            initial="normal"
            variants={WWW_VARIANT}
            custom={1}
          />
          <motion.path
            d="M17 10l1 4l1.5 -4l1.5 4l1 -4"
            animate={controls}
            initial="normal"
            variants={WWW_VARIANT}
            custom={2}
          />

          {/* globe after */}
          <motion.path
            d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4"
            animate={controls}
            initial="normal"
            variants={GLOBE_VARIANT}
            custom={0}
          />
          <motion.path
            d="M11.5 3a16.989 16.989 0 0 0 -1.826 4"
            animate={controls}
            initial="normal"
            variants={GLOBE_VARIANT}
            custom={1}
          />
          <motion.path
            d="M12.5 3a16.989 16.989 0 0 1 1.828 4"
            animate={controls}
            initial="normal"
            variants={GLOBE_VARIANT}
            custom={2}
          />
          <motion.path
            d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4"
            animate={controls}
            initial="normal"
            variants={GLOBE_VARIANT}
            custom={3}
          />
          <motion.path
            d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4"
            animate={controls}
            initial="normal"
            variants={GLOBE_VARIANT}
            custom={4}
          />
          <motion.path
            d="M12.5 21a16.989 16.989 0 0 0 1.828 -4"
            animate={controls}
            initial="normal"
            variants={GLOBE_VARIANT}
            custom={5}
          />
        </svg>
      </div>
    );
  },
);

BrowserIcon.displayName = 'BrowserIcon';

export { BrowserIcon };
