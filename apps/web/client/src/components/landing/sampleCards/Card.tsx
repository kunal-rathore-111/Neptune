"use client";

import { LinkIcon } from "@repo/icons";
import { CardBody, CardContainer, CardItem } from "@repo/ui";
import { useRef } from "react";

import Tags from "@/lib/utils/Tags";
import { ShareIcon } from "@repo/icons";
import { EditIcon } from "@repo/icons";
import { DeleteIcon } from "@repo/icons";
import { BrowserIcon } from "@repo/icons";
import { type CardDTO } from "@/lib/constants/content/SampleCardData";
import { easeInOut, motion } from "framer-motion";
import type { IconHandle } from "@repo/ui";
import { ShareOffIcon } from "@repo/icons";
import { LinkOffIcon } from "@repo/icons";

export function ThreeDCardDemo({ cardData }: { cardData: CardDTO }) {
  const parent = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.4 },
    },
  };
  const iconParent = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const subchild = {
    hidden: { opacity: 0, x: -20 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
  };

  const IconRef = useRef<Array<IconHandle | null>>([]);
  return (
    <CardContainer className="inter-var">
      <motion.div variants={parent} initial={"hidden"} animate="show">
        <CardBody className="relative flex flex-col justify-evenly rounded-xl bg-zinc-100 p-3 text-start text-xs shadow-sm shadow-zinc-900 sm:h-65 dark:bg-zinc-950/80 dark:shadow-zinc-300/90">
          <CardItem
            className="w-full text-xs"
            onMouseEnter={() =>
              IconRef.current?.forEach((x) => x?.startAnimation())
            }
            onMouseLeave={() =>
              IconRef.current?.forEach((x) => x?.stopAnimation())
            }
            translateZ="90"
            translateY={-15}
          >
            <div>
              <motion.div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <cardData.categoryIcon
                    size={18}
                    className="rounded-sm border-2 border-black/50 p-1 dark:border-white/50"
                    ref={(el) => {
                      IconRef.current[0] = el;
                    }}
                  />
                  <h5>{cardData.category}</h5>
                </div>
                <div className="flex items-center gap-1">
                  {cardData.isShared ? (
                    <>
                      <LinkIcon
                        ref={(el) => {
                          IconRef.current[1] = el;
                        }}
                        size={18}
                      />
                      <span>Shared</span>
                    </>
                  ) : (
                    <>
                      <LinkOffIcon
                        ref={(el) => {
                          IconRef.current[1] = el;
                        }}
                        size={18}
                      />
                      <span>Not Shared</span>
                    </>
                  )}
                </div>
              </motion.div>
            </div>{" "}
          </CardItem>
          <CardContentSection cardData={cardData} />
          <CardItem
            translateZ={-20}
            translateY="24"
            className={"mt-4 flex w-full items-center justify-between text-xs"}
          >
            <motion.div variants={subchild}>{cardData.date}</motion.div>
            <motion.div className="flex gap-2" variants={iconParent}>
              {[
                EditIcon,
                cardData.isShared ? ShareIcon : ShareOffIcon,
                DeleteIcon,
                BrowserIcon,
              ].map((Icon, idx) => (
                <motion.div key={idx} variants={subchild}>
                  <Icon size={18} />
                </motion.div>
              ))}
            </motion.div>
          </CardItem>
        </CardBody>
      </motion.div>
    </CardContainer>
  );
}

export function CardContentSection({ cardData }: { cardData: CardDTO }) {
  const child = {
    hidden: { opacity: 0, y: 10 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: easeInOut,
      },
    },
  };
  return (
    <div className="flex flex-col gap-2">
      <motion.div variants={child}>
        <CardItem
          translateZ="60"
          className="mt-2 max-w-sm text-sm font-semibold"
        >
          {cardData.contentTitle}
        </CardItem>
      </motion.div>
      <motion.div variants={child}>
        <CardItem
          translateZ="60"
          className="max-w-sm text-sm font-thin text-gray-600/90 dark:text-zinc-400/70"
        >
          {cardData.contentDescription}
        </CardItem>
      </motion.div>
      <motion.div variants={child}>
        <CardItem translateZ="60" className="mt-2 max-w-sm text-sm">
          <Tags tags={cardData.tags} />
        </CardItem>
      </motion.div>
    </div>
  );
}
