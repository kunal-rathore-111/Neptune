'use client';

import type { Transition, Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@repo/libs';

export interface ChromeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChromeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const TRANSITION: Transition = {
  duration: 3,
  opacity: { delay: 0.15 },
};

const VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [1, 0, 1],
    opacity: [0, 1],
    transition: {
      ...TRANSITION,
      repeatDelay: 3,
      repeat: Infinity,
      delay: 0.1 * custom,
    },
  }),
};

const ChromeIcon = forwardRef<ChromeIconHandle, ChromeIconProps>(({ className, size = 28, ...props }) => {
  return (
    <div className={cn(className)} {...props}>
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
        <motion.circle animate={'animate'} custom={0} cx="12" cy="12" r="4" variants={VARIANTS} />
        <motion.line animate={'animate'} custom={3} variants={VARIANTS} x1="21.17" x2="12" y1="8" y2="8" />
        <motion.line animate={'animate'} custom={3} variants={VARIANTS} x1="3.95" x2="8.54" y1="6.06" y2="14" />
        <motion.line animate={'animate'} custom={3} variants={VARIANTS} x1="10.88" x2="15.46" y1="21.94" y2="14" />
      </svg>
    </div>
  );
});

ChromeIcon.displayName = 'ChromeIcon';

export { ChromeIcon };
