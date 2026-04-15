import { motion } from "framer-motion";
import ThemeToggleButton from "@repo/ui/custom_buttons/ThemeButton";

export default function LoadingPage() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center justify-center bg-white dark:bg-black relative">
      <div className="absolute top-6 right-6">
        <ThemeToggleButton />
      </div>

      <div className="flex items-center text-2xl  tracking-wide text-zinc-800 dark:text-zinc-200">
        <span>Loading</span>
        <span className="pl-1 flex w-12 justify-start">
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          >
            .
          </motion.span>
        </span>
      </div>
    </div>
  );
}
