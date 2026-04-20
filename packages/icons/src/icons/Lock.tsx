'use client';

import { motion } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@repo/libs';

export interface LockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LockIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LockIcon = forwardRef<LockIconHandle, LockIconProps>(({ className, size = 28, ...props }) => {
  return (
    <div className={cn(className)} {...props}>
      <motion.svg
        animate={'animate'}
        fill="none"
        height={size}
        initial="normal"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
          repeatType: 'loop',
          repeatDelay: 2,
          repeat: Infinity,
        }}
        variants={{
          normal: {
            rotate: 0,
            scale: 1.6,
          },
          animate: {
            rotate: [-3, 1, -2, 0],
            scale: [0.95, 1.05, 0.98, 1],
          },
        }}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg">
        <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
        <motion.path
          animate={'animate'}
          d="M7 11V7a5 5 0 0 1 10 0v4"
          initial="normal"
          transition={{
            duration: 1.8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 4,
            delay: 1.2,
            repeatType: 'loop',
          }}
          variants={{
            normal: {
              pathLength: 1,
            },
            animate: {
              pathLength: [1, 0.1, 1],
            },
          }}
        />
      </motion.svg>
    </div>
  );
});

LockIcon.displayName = 'LockIcon';

export { LockIcon };
