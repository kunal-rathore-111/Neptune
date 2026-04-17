import { DotComp } from "@repo/ui";
import { BentoGrid } from "./BentoGrid/BentoGridLayout";

export default function Features() {
  return (
    <>
      <section className="mt-0 flex flex-col text-start" id="features">
        <div className="flex flex-col gap-5">
          <h3 className="flex items-center gap-1 font-semibold text-black/70 uppercase dark:text-white/60">
            {<DotComp />} Features
          </h3>
          <h2 className="text-7xl">Designed for how you actually think</h2>

          {/* bento grid */}
          <BentoGrid />
        </div>
      </section>
    </>
  );
}
