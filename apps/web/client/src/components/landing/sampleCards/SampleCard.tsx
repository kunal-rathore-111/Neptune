import { motion, easeOut, easeInOut } from "framer-motion";
import { card1, card2, card3 } from "@/lib/constants/content/SampleCardData";
import { ThreeDCardDemo } from "./Card";
import { cn } from "@repo/libs";

export default function SampleCards() {
  const parent = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.4 },
    },
  };
  const child = {
    hidden: { opacity: 0, y: -50, x: 0 },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeInOut,
      },
    },
  };
  return (
    <>
      <div className="mt-0 border-y pt-10  flex flex-col overflow-hidden ">
        <h3 className="mb-10 flex w-full  items-center justify-center gap-1 text-6xl font-semibold text-black/70 uppercase dark:text-white/60">
          # See how your data is organized
        </h3>
        <hr />
        <div className="flex flex-col items-center justify-center py-10">
          <motion.section
            variants={parent}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col justify-evenly lg:flex-row"
            transition={{ duration: 0.3, ease: easeOut }}
          >
            {[card1, card2, card3].map((x, idx) => (
              /* hidding card 2 and 3 using tailwind condition */
              <motion.div
                variants={child}
                key={idx}
                className={cn(
                  "p-4",
                  idx === 1 ? "hidden md:block" : "",
                  idx === 2 ? "hidden lg:block" : "",
                )}
              >
                <ThreeDCardDemo cardData={x} />
              </motion.div>
            ))}
          </motion.section>
        </div>
        <hr />
      </div>
    </>
  );
}
