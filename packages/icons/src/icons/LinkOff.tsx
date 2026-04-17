'use client';

import { motion, useAnimation, type Variants, type HTMLMotionProps } from 'framer-motion';
import type { ForwardedRef } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from '@repo/libs';

export interface LinkOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LinkOffIconProps extends HTMLMotionProps<'div'> {
  size?: number;
}

/* ================= VARIANTS ================= */

const LINK_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.5 },
  },
};

const CONNECT_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
  },
  animate: {
    pathLength: [0, 1],
    transition: { duration: 0.4 },
  },
};

/* 🔥 SAME as ShareOffIcon */
const SLASH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
};

/* ================= COMPONENT ================= */

const LinkOffIcon = forwardRef(
  (
    { className, size = 24, onMouseEnter, onMouseLeave, ...props }: LinkOffIconProps,
    ref: ForwardedRef<LinkOffIconHandle>,
  ) => {
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
      (e?: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e as any);
        } else {
          controls.start('animate');
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e?: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e as any);
        } else {
          controls.start('normal');
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <motion.div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="normal"
          animate={controls}>
          {/* Link */}
          <motion.path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" variants={LINK_VARIANTS} />

          <motion.path
            d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"
            variants={LINK_VARIANTS}
          />

          {/* Connector */}
          <motion.path d="M9 15l6 -6" variants={CONNECT_VARIANTS} />

          {/* 🔥 Slash (same behavior as ShareOffIcon) */}
          <motion.path d="M5 5L19 19" variants={SLASH_VARIANTS} />
        </motion.svg>
      </motion.div>
    );
  },
);

LinkOffIcon.displayName = 'LinkOffIcon';

export { LinkOffIcon };
