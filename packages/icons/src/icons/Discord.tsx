"use client";

import { cn } from "@repo/libs";
import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";


export interface DiscordIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface DiscordIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}

const DISCORD_GROUP_VARIANTS: Variants = {
    normal: {
        y: 0,
        rotate: 0,
    },
    animate: {
        y: [0, -1, 0, -1, 0],
        rotate: [0, -2, 2, -2, 0],
        transition: {
            duration: 0.8,
            ease: "easeInOut",
        },
    },
};

const EYE_VARIANTS: Variants = {
    normal: {
        y: 0,
        scaleY: 1,
    },
    animate: {
        y: [0, -1.2, 0, -1.2, 0],
        transition: {
            duration: 0.8,
            times: [0, 0.25, 0.4, 0.55, 1],
            ease: "easeInOut",
        },
    },
};

const DiscordIcon = forwardRef<DiscordIconHandle, DiscordIconProps>(
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
            [controls, onMouseEnter]
        );

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (isControlledRef.current) {
                    onMouseLeave?.(e);
                } else {
                    controls.start("normal");
                }
            },
            [controls, onMouseLeave]
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
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <motion.g
                        animate={controls}
                        initial="normal"
                        variants={DISCORD_GROUP_VARIANTS}
                        style={{ originX: "12px", originY: "12px" }}
                    >
                        <motion.path
                            animate={controls}
                            variants={EYE_VARIANTS}
                            style={{ originX: "9px", originY: "12px" }}
                            d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"
                        />
                        <motion.path
                            animate={controls}
                            variants={EYE_VARIANTS}
                            style={{ originX: "15px", originY: "12px" }}
                            d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"
                        />
                        <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" />
                        <path d="M7 16.5c3.5 1 6.5 1 10 0" />
                    </motion.g>
                </svg>
            </div>
        );
    }
);

DiscordIcon.displayName = "DiscordIcon";

export { DiscordIcon };