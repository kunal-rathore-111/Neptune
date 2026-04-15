import { motion, easeInOut, AnimatePresence } from "framer-motion";
import Tags from "@/lib/utils/Tags";

import { useEffect, useState } from "react";
import { Tree, type TreeViewElement } from "@repo/ui/contentTree/content-tree";
import { TypingAnimation } from "@repo/ui/typing-animation";
import { LockIcon } from "@repo/icons/Lock";
import { ChromeIcon } from "@repo/icons/Chrome";
import { Switch } from "@repo/ui/switch";
import DotComp from "@repo/ui/Dot";

export function Col1() {
  const elements: TreeViewElement[] = [
    {
      id: "Categories",
      type: "folder",
      name: "Categories",
      children: [
        {
          id: "All",
          type: "folder",
          name: "All",
          children: [
            {
              id: "React Library",
              name: "React Library",
            },
            {
              id: "Tailwind CSS",
              name: "Tailwind CSS",
            },
            {
              id: "Stripe — Financial",
              name: "Stripe — Financial",
            },
            {
              id: "OpenAI — AI research",
              name: "OpenAI — AI research",
            },
            {
              id: "Top-100 interview questions, JavaScript",
              name: "Top-100 interview questions, JavaScript",
            },
            {
              id: "GitHub",
              name: "GitHub",
            },
          ],
        },
        {
          id: "Finance",
          type: "folder",
          name: "Finance",
          children: [
            {
              id: "Stripe — Financial",
              name: "Stripe — Financial",
            },
          ],
        },
        {
          id: "Study",
          type: "folder",
          name: "Study",
          children: [
            {
              id: "Top-100 interview questions, JavaScript",
              name: "Top-100 JS interview questions",
            },
          ],
        },
        {
          id: "Research",
          type: "folder",
          name: "Research",
          children: [
            {
              id: "OpenAI — AI research",
              name: "OpenAI — AI research",
            },
          ],
        },
        {
          id: "Development",
          type: "folder",
          name: "Development",
          children: [
            {
              id: "React Library",
              name: "React Library",
            },
            {
              id: "Tailwind CSS",
              name: "Tailwind CSS",
            },
          ],
        },
      ],
    },
  ];

  const folderIds = ["Categories", "All", "Research", "Development"];

  return (
    <div className="col-span-1 flex flex-col gap-5 rounded-l-4xl border-y border-l border-black p-5 dark:border-white">
      <h4 className="text-2xl">A sample of organized content</h4>
      <Tree elements={elements} initialExpandedItems={folderIds} />
    </div>
  );
}

export function Col2Row1() {
  const tagsParentVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
      },
    },
  };
  const tags = [
    "Development",
    "Finance",
    "Social",
    "GitHub",
    "AI",
    "Research",
    "Others",
  ];
  const tagsChildVariant = {
    hidden: { opacity: 0, y: -15, transition: { duration: 0.3 } },
    show: (i: number) => ({
      opacity: [0, 1, 0],
      y: 0,
      transition: {
        duration: 2,
        ease: easeInOut,
        repeat: Infinity,
        delay: i * 0.3, // stagger offset
        repeatDelay: 2,
      },
    }),
  };
  return (
    <>
      <motion.div
        className="z-10 flex flex-col rounded-4xl border border-black bg-white p-5 dark:border-white dark:bg-black"
        variants={tagsParentVariant}
        initial={"hidden"}
        animate={"show"}
      >
        <h4 className="text-3xl"> Smart tags</h4>
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.8 }}
            className="text-lg font-semibold"
          >
            Auto-organize with intelligent tags
          </motion.div>
          {/* tags content poping using parent child using variants */}
          <motion.div
            className="flex items-center justify-center"
            variants={tagsParentVariant}
            initial={"hidden"}
            animate={"show"}
          >
            {
              <Tags
                tags={tags}
                childVariant={tagsChildVariant}
                shouldSlice={false}
              />
            }
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg"
          >
            Suggested as you save. Filter and combine tags instantly.
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export function Col2Row2() {
  return (
    <>
      <div className="mt-5 flex flex-col items-start justify-center rounded-4xl rounded-b-none border border-black p-5 md:rounded-br-4xl dark:border-white dark:bg-black">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-extralight">Privacy</p>
          <div className="flex flex-col gap-3">
            <h4 className="text-3xl font-semibold">
              <LockIcon
                size={24}
                className="mr-2 inline-block text-red-500 dark:text-lime-500"
              />
              Private by default
            </h4>
            <motion.span>
              <TypingAnimation className="text-black/40 dark:text-zinc-300/40">
                Everything encrypted. Your bookmarks belong to you, not us.
              </TypingAnimation>
            </motion.span>
          </div>
        </div>
      </div>
    </>
  );
}

export function Col3Row1() {
  const introducingSoonParent = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 3,
        staggerChildren: 0.3,
      },
    },
  };
  const introducingSoonChild = {
    hidden: { opacity: 0 },
    show: {
      opacity: [0, 1],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
  };

  return (
    <>
      <div className="flex flex-col gap-3 border-black p-5 md:rounded-4xl md:border md:border-t-0 lg:rounded-l-none lg:border-t lg:border-b-0 lg:border-l-0 dark:border-white">
        <motion.p
          variants={introducingSoonParent}
          initial={"hidden"}
          animate={"show"}
          className="text-xs text-black/80 dark:text-zinc-300/70"
        >
          <span>Introdu</span>
          <span className="opacity-90">cing S</span>
          <motion.span variants={introducingSoonChild}>o</motion.span>
          <motion.span variants={introducingSoonChild}>o</motion.span>
          <motion.span variants={introducingSoonChild}>o</motion.span>
          <motion.span variants={introducingSoonChild}>o</motion.span>
          <motion.span variants={introducingSoonChild}>n</motion.span>
          <motion.span variants={introducingSoonChild}>.</motion.span>
          <motion.span variants={introducingSoonChild}>.</motion.span>
          <motion.span variants={introducingSoonChild}>.</motion.span>
          <motion.span variants={introducingSoonChild}>.</motion.span>
          <motion.span variants={introducingSoonChild}>.</motion.span>
        </motion.p>
        <div className="flex items-center gap-1">
          <ChromeIcon className="text-orange-500 dark:text-yellow-400" />
          <span className="text-2xl">Browser Extension</span>
        </div>

        <p className="font-semibold">Save any page in one click</p>
        <p className="text-xs text-black/40 dark:text-zinc-300/40">
          Chrome, Firefox, and Safari. Save without leaving the tab.
        </p>
      </div>
    </>
  );
}

export function Col3Row2() {
  const shareParent = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,
      y: [-10, 0],
      transition: {
        duration: 0.65,
        staggerChildren: 0.5,
      },
    },
    exit: {
      opacity: [0],
      transition: {
        duration: 0.65,
      },
    },
  };

  const shareChild = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: [0, 0, 1],
      y: [-4, -3.8, 0],
      transition: {
        duration: 0.45,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsOn(!isOn);
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [isOn]);

  const sharesArray = ["2ndmind.app/s/design-inspo", "2ndmind.app/s/ai-papers"];

  return (
    <motion.div className="relative flex flex-col rounded-l-none border border-black p-5 md:rounded-4xl md:border-t-0 lg:border-t lg:border-l-0 dark:border-white">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-3">
          <h4 className="flex items-center gap-2 text-2xl">
            <DotComp /> Share collections instantly
          </h4>
          <motion.div className="m-1 flex flex-col gap-2">
            <div className="flex w-full items-center justify-between gap-2 rounded-lg border bg-zinc-200 px-10 py-1 dark:bg-zinc-800">
              <div>Make shareable</div>
              <Switch className="transition-all duration-800" checked={isOn} />
            </div>
            <motion.div className="flex flex-col gap-1 overflow-hidden" layout>
              <AnimatePresence mode="popLayout">
                {isOn && (
                  <motion.div
                    layout
                    className="mt-1 flex flex-col gap-1 rounded-lg border bg-zinc-300/60 px-3 py-2 dark:border-emerald-500/40 dark:bg-zinc-600/20"
                    variants={shareParent}
                    initial={"hidden"}
                    animate={"show"}
                    exit={"exit"}
                  >
                    <motion.span
                      className="text-xs text-black/40 dark:text-zinc-300/40"
                      variants={shareChild}
                    >
                      Public link created
                    </motion.span>
                    <motion.span
                      className="text-[16px] text-fuchsia-400 dark:text-emerald-400"
                      variants={shareChild}
                    >
                      2ndmind.app/s/abc123
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="mt-1 flex flex-col gap-1 rounded-lg border bg-zinc-300/60 px-3 py-4 dark:border-zinc-200/40 dark:bg-zinc-600/20"
                layout
                transition={{
                  layout: {
                    duration: 0.5,
                    ease: [0.25, 1, 0.5, 1],
                  },
                }}
              >
                <span>SHARED COLLECTIONS</span>
                {sharesArray.map((text, idx) => {
                  return (
                    <motion.span
                      key={idx}
                      className="text-[16px] text-zinc-700 transition-colors hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
                    >
                      - {text}
                    </motion.span>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
