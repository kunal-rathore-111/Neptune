import { ClapIcon } from "@repo/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { SendIcon } from "@repo/icons";
import { AvatarGroupComp } from "./AvatarGroup";
import { Button, DotPattern } from "@repo/ui";
import { GlobeIcon } from "@repo/icons";

export default function HeroWrapper() {
  return (
    <div className="relative flex min-h-screen items-center justify-center pt-12">
      <DotPattern
        cr={1.5}
        className="z-0 opacity-75 [-webkit-mask-image:radial-gradient(circle_at_center,transparent_45%,black_90%)]"
      />
      <HeroSection />
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative z-10 flex flex-col items-center justify-center gap-6 text-center">
      {/* app intro text */}
      <div className="md:space-y-6 lg:space-y-4">
        <div className="flex flex-col gap-6">
          <h1 className="text-8xl leading-25 font-semibold">
            Neptune, <br /> Your Second Mind <br /> with AI
          </h1>
          <div>
            <p className="text-zinc-400 dark:text-zinc-600">
              Save, organize, and resurface any content in seconds.
              <br /> Built for people who live in the browser.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <Button asChild>
                <motion.button
                  whileHover={"animate"}
                  onClick={() => navigate("/sign-up")}
                >
                  Get Started Free
                  {<SendIcon />}
                </motion.button>
              </Button>

              <Button
                variant={"secondary"}
                className="border border-amber-900/40 bg-white/10 shadow-sm hover:bg-gray-300/30 dark:border-white/30 dark:hover:bg-zinc-300/14"
                asChild
              >
                <motion.button whileHover={"animate"}>
                  View demo
                  {<ClapIcon />}
                </motion.button>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <AvatarGroupComp />
            <span className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
              <span>Trusted by users worldwide</span>
              {
                <GlobeIcon
                  className="transition-all duration-300 ease-in-out hover:scale-125"
                  size={22}
                />
              }
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
