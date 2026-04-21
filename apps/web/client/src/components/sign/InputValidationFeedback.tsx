import { cn } from "@repo/libs";
import { Check, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type InputValidationFeedbackType = {
  input: string;
  inputValidation: any;
  inputRules: {
    message: string;
    test: (p: string) => boolean;
  }[];
};

// to use same to show ticks and message with respect to the input
export function InputValidationFeedback({
  input,
  inputValidation,
  inputRules,
}: InputValidationFeedbackType) {
  return (
    <AnimatePresence mode="wait">
      {input.length > 0 && !inputValidation.success ? (
        <motion.div
          className="w-full space-y-1 pl-2 text-start"
          initial={{
            opacity: [0],
          }}
          animate={{ opacity: [1], transition: { duration: 0.9 } }}
          exit={{ opacity: [0], transition: { duration: 0.4 } }}
        >
          {inputRules.map((x, idx) => {
            const testResult = x.test(input);
            return (
              <p
                key={idx}
                className={cn(
                  testResult
                    ? "text-zinc-400 dark:text-zinc-600"
                    : "text-zinc-900 dark:text-zinc-300",
                  "flex items-center text-xs transition-colors duration-900",
                )}
              >
                <span className="mr-1 inline-block rounded border dark:border-zinc-600">
                  {testResult ? <Check size={14} /> : <X size={14} />}
                </span>{" "}
                {x.message}
              </p>
            );
          })}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
