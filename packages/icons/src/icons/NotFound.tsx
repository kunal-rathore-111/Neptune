'use client';

import type { Transition, Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from '@repo/libs';

export interface NotFoundIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface NotFoundIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  duration: 0.6,
  opacity: { duration: 0.2 },
};

const PATH_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
  },
};

const NotFoundIcon = forwardRef<NotFoundIconHandle, NotFoundIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
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
          controls.start('normal');
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg
          fill="none"
          height={size}
          width={size}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M3 8v3a1 1 0 0 0 1 1h3"
            animate={controls}
            variants={PATH_VARIANTS}
            transition={DEFAULT_TRANSITION}
          />
          <motion.path d="M7 8v8" animate={controls} variants={PATH_VARIANTS} transition={DEFAULT_TRANSITION} />
          <motion.path
            d="M17 8v3a1 1 0 0 0 1 1h3"
            animate={controls}
            variants={PATH_VARIANTS}
            transition={DEFAULT_TRANSITION}
          />
          <motion.path d="M21 8v8" animate={controls} variants={PATH_VARIANTS} transition={DEFAULT_TRANSITION} />
          <motion.path
            d="M10 10v4a2 2 0 1 0 4 0v-4a2 2 0 1 0 -4 0"
            animate={controls}
            variants={PATH_VARIANTS}
            transition={DEFAULT_TRANSITION}
          />
        </svg>
      </div>
    );
  },
);

NotFoundIcon.displayName = 'NotFoundIcon';

export { NotFoundIcon };
