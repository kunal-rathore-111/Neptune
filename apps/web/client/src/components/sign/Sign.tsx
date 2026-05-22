"use client";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { LoaderIcon } from "@repo/icons";
import { FloatingLabelInput, toast } from "@repo/ui";
import { ThemeHomeComp } from "@repo/ui";
import { InputValidationFeedback } from "./InputValidationFeedback";
import {
  signInSchema,
  signUpSchema,
  validatePasswordInput,
  validateUsernameInput,
} from "@repo/validation";
import { useSign } from "@/hooks/react-query-hooks/useSign";
import { PasswordRules, UsernameRules } from "@/lib/constants/content/rules";
import { useFetchUserProfile } from "@/hooks/react-query-hooks/useUserProfile";
import LoadingPage from "@/Pages/Loading";

export type AuthMode = "signin" | "signup";

const authContent = {
  signin: {
    heading: "Welcome back",
    subheading: "Enter your details to sign in",
    buttonTitle: "Login",
    alternateText: "Don't have an account? ",
    alternateAction: "Sign up",
    alternateActionRoute: "/sign-up",
  },

  signup: {
    heading: "Create an account",
    subheading: "Enter your details below to create your account",
    buttonTitle: "Create Account",
    alternateText: "Already have an account? ",
    alternateAction: "Sign in",
    alternateActionRoute: "/sign-in",
  },
};

// Main Component with shadcn/ui styling
const SignComp = ({ mode }: { mode: AuthMode }) => {
  if (mode !== "signin" && mode !== "signup") {
    return <div>Invalid mode</div>;
  }

  const navigate = useNavigate();
  const { data: response, isLoading } = useFetchUserProfile();

  const content = authContent[mode];

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordValidation, setPasswordValidation] = useState<any>();
  const [usernameValidation, setUsernameValidation] = useState<any>();

  const [username, setUsername] = useState<string>("");

  const { mutate: signMutate, isPending } = useSign();

  const cardRef = useRef<HTMLDivElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // effect to show/hide PasswordRules
  useEffect(() => {
    setPasswordValidation(validatePasswordInput(password));
  }, [password]);
  // effect to show/hide UsernameRules
  useEffect(() => {
    setUsernameValidation(validateUsernameInput(username));
  }, [username]);

  /* FORM SUBMISSION */
  async function handleSignFormSubmit(e: FormEvent) {
    e.preventDefault();
    const signData =
      mode === "signin" ? { email, password } : { email, password, username };
    // check zodValidation
    const result =
      mode === "signin"
        ? signInSchema.safeParse(signData)
        : signUpSchema.safeParse(signData);

    if (!result.success) {
      //console.log(result.error.issues[0]);
      toast.error(result.error.issues[0].message, { position: "top-right" });
      return;
    } else {
      // if all above success then call useSign function to sign-in
      signMutate({ data: signData, mode });
      // reset form
    }
  }

  /* if userAlready logged in redirect to the dashboardPage */
  useEffect(() => {
    if (response && response?.type === "success") navigate("/user/dashboard");
  }, [response]);
  if (isLoading) return <LoadingPage />;
  //hide the sign ui when the page is redirecting to dashboard
  if (response?.type === "success") return <LoadingPage />;

  return (
    <>
      <div className="flex items-center justify-center p-6 lg:w-full">
        <div className="relative w-full min-w-96">
          {/* Main Card with shadcn/ui styling */}
          <div
            ref={cardRef}
            className="relative rounded-lg bg-white p-6 shadow-lg shadow-zinc-500/40 transition-all duration-200 hover:shadow-md dark:border-2 dark:border-zinc-700 dark:bg-black"
          >
            <ThemeHomeComp />
            {/* Header */}
            <div className="mb-6 flex flex-col space-y-2 text-center">
              <h1 className="text-foreground text-2xl font-semibold tracking-tight">
                {content.heading}
              </h1>
              <p className="text-muted-foreground text-sm">
                {content.subheading}
              </p>
            </div>

            <form onSubmit={handleSignFormSubmit}>
              <fieldset className="space-y-4" disabled={isPending}>
                {mode === "signup" ? (
                  <div className="space-y-2">
                    {/* Full Name Input */}
                    <FloatingLabelInput
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Full Name"
                      icon={<UserIcon size={18} />}
                    />
                    <InputValidationFeedback
                      input={username}
                      inputValidation={usernameValidation}
                      inputRules={UsernameRules}
                    />
                  </div>
                ) : null}

                {/* Email Input */}
                <div className="space-y-2">
                  <FloatingLabelInput
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    icon={<MailIcon size={18} />}
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <FloatingLabelInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    icon={<LockIcon size={18} />}
                    rightIcon={
                      showPassword ? (
                        <EyeOffIcon size={18} />
                      ) : (
                        <EyeIcon size={18} />
                      )
                    }
                    onRightIconClick={togglePasswordVisibility}
                  />
                  <InputValidationFeedback
                    input={password}
                    inputValidation={passwordValidation}
                    inputRules={PasswordRules}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  disabled={isPending}
                >
                  {/* shows button label or loading using state */}
                  {isPending ? <LoaderIcon size={22} /> : content.buttonTitle}
                </button>
              </fieldset>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {content.alternateText}{" "}
              <Link
                to={content.alternateActionRoute}
                className="hover:text-primary underline underline-offset-4 transition-colors"
              >
                {content.alternateAction}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignComp;
