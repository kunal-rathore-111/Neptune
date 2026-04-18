import { cn } from "@repo/libs";
import { signUpSchema } from "@repo/validation";
import { Check, X } from "lucide-react";

type CommonValidatorCompType = {
  input: string;
  inputValidation: any;
  inputRules: {
    message: string;
    test: (p: string) => boolean;
  }[];
};

// to use same to show ticks and message on username and password both
export function CommonValidatorComp({
  input,
  inputValidation,
  inputRules,
}: CommonValidatorCompType) {
  return input.length > 0 && !inputValidation.success ? (
    <div className="w-full space-y-1 pl-2 text-start">
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
    </div>
  ) : null;
}

export function validatePasswordInput(input: string) {
  return signUpSchema.shape.password.safeParse(input);
}

export function validateUsernameInput(input: string) {
  return signUpSchema.shape.username.safeParse(input);
}
