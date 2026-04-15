import { motion } from "framer-motion";
import Marquee from "@repo/ui/Marquee";
import { HandHeartIcon } from "@repo/icons/HandHeart";
import {
  animateIconUsingRef,
  type IconHandle,
} from "@/lib/utils/IconAnimateRef";
import { useRef } from "react";
import { AudienceCommentArray } from "@/lib/constants/content/audience";
import { AudienceCard } from "./AudienceCard";

export default function Audience() {
  const AnimateRef = useRef<IconHandle>(null);
  return (
    <>
      <div className="mt-0 flex flex-col overflow-hidden">
        <h3
          className="text-6xl leading-none font-semibold text-black/70 uppercase dark:text-white/60"
          {...animateIconUsingRef(AnimateRef)}
        >
          Love from our Audience
          <HandHeartIcon
            ref={AnimateRef}
            size={44}
            className="ml-2 inline-block"
          />
        </h3>
        <div className="mt-8 flex flex-col items-center justify-center">
          <motion.div className="mt-8 flex items-center justify-center gap-7">
            <Marquee>
              {AudienceCommentArray.map((data, idx) => (
                <AudienceCard data={data} idx={idx} />
              ))}
            </Marquee>
          </motion.div>
        </div>
      </div>
    </>
  );
}
