'use client';

import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from '@repo/libs';

export interface EditIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface EditIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

/* ================= VARIANTS ================= */

// main pencil body → draw effect
const BODY_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// tip line → slight delay (feels like writing finishing)
const TIP_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.35,
      delay: 0.15,
      ease: 'easeOut',
    },
  },
};

/* ================= COMPONENT ================= */

const EditIcon = forwardRef<EditIconHandle, EditIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const bodyControls = useAnimation();
    const tipControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await bodyControls.start('animate');
          tipControls.start('animate');
        },
        stopAnimation: () => {
          bodyControls.start('normal');
          tipControls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          await bodyControls.start('animate');
          tipControls.start('animate');
        }
      },
      [bodyControls, tipControls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          bodyControls.start('normal');
          tipControls.start('normal');
        }
      },
      [bodyControls, tipControls, onMouseLeave],
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
          {/* body */}
          <motion.path
            d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"
            animate={bodyControls}
            initial="normal"
            variants={BODY_VARIANTS}
          />

          {/* tip */}
          <motion.path d="M13.5 6.5l4 4" animate={tipControls} initial="normal" variants={TIP_VARIANTS} />
        </svg>
      </div>
    );
  },
);

EditIcon.displayName = 'EditIcon';

export { EditIcon };
