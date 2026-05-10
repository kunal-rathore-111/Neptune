import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface NeptunePlanetIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface NeptunePlanetIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const NeptunePlanetIcon = forwardRef<
  NeptunePlanetIconHandle,
  NeptunePlanetIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
      if (isControlledRef.current) onMouseEnter?.(e);
      else controls.start("animate");
    },
    [controls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) onMouseLeave?.(e);
      else controls.start("normal");
    },
    [controls, onMouseLeave],
  );

  // Ellipse circumference ≈ 2π * sqrt((rx²+ry²)/2) = ~45 for rx=10, ry=4
  // Half = ~22.5, use 23
  const HALF = 23;

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        fill="none"
        height={size}
        width={size}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        {/* BACK RING — bottom half only */}
        <motion.ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          initial={{ rotate: -20 }}
          animate={controls}
          strokeDasharray={`${HALF} ${HALF}`}
          strokeDashoffset={HALF}
          variants={{
            normal: { rotate: -20, opacity: 0.6 },
            animate: {
              rotate: -20,
              opacity: [0.6, 1, 0.6],
              transition: { duration: 0.8, repeat: Infinity },
            },
          }}
          style={{ transformOrigin: "12px 12px", transformBox: "fill-box" }}
        />

        {/* PLANET */}
        <motion.circle
          cx="12"
          cy="12"
          r="7"
          animate={controls}
          variants={{
            normal: { scale: 1, rotate: 0 },
            animate: {
              scale: [1, 1.05, 1],
              rotate: [0, 360],
              transition: {
                scale: { duration: 0.8, ease: "easeInOut", repeat: Infinity },
                rotate: { duration: 3, ease: "linear", repeat: Infinity },
              },
            },
          }}
          style={{ transformOrigin: "12px 12px", transformBox: "fill-box" }}
        />

        {/* FRONT RING — top half only */}
        <motion.ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          initial={{ rotate: -20 }}
          animate={controls}
          strokeDasharray={`${HALF} ${HALF}`}
          strokeDashoffset={0}
          variants={{
            normal: { rotate: -20, opacity: 1 },
            animate: {
              rotate: -20,
              opacity: [1, 0.8, 1],
              transition: { duration: 0.8, repeat: Infinity },
            },
          }}
          style={{ transformOrigin: "12px 12px", transformBox: "fill-box" }}
        />

        {/* MOON */}
        <motion.circle
          cx="12"
          cy="12"
          r="1.2"
          fill="currentColor"
          stroke="none"
          animate={controls}
          initial={{ x: -11, y: -2 }}
          variants={{
            normal: {
              x: -11,
              y: -2,
              transition: { duration: 0 },
            },
            animate: {
              x: [-11, 0, 11, 0, -11],
              y: [-2, 4, -2, -4, -2],
              transition: {
                duration: 1.8,
                ease: "linear",
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: Infinity,
              },
            },
          }}
          style={{ transformBox: "fill-box" }}
        />
      </svg>
    </div>
  );
});

NeptunePlanetIcon.displayName = "NeptunePlanetIcon";

export { NeptunePlanetIcon };
