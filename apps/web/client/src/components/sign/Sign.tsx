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
import { DiscordIcon, GithubIcon, GoogleIcon, LoaderIcon } from "@repo/icons";
import { Input, Label, toast, type IconHandle } from "@repo/ui";
import { ThemeHomeComp } from "@repo/ui";
import { InputValidationFeedback } from "./InputValidationFeedback";
import {
  signInSchema,
  signUpSchema,
  validatePasswordInput,
  validateNameInput,
} from "@repo/validation";
import { useSign } from "@/hooks/react-query-hooks/useSign";
import { PasswordRules, NameRules } from "@/lib/constants/content/rules";

import { motion } from "framer-motion"

export type AuthMode = "signin" | "signup";

const authContent = {
  signin: {
    heading: "Welcome back",
    subheading: "Enter your details to login to your account",
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

  const content = authContent[mode];

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordValidation, setPasswordValidation] = useState<any>();
  const [nameValidation, setNameValidation] = useState<any>();

  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const { mutate: signMutate, isPending } = useSign();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  /* functions */
  async function handleSignFormSubmit(e: FormEvent) {
    e.preventDefault();
    const signData =
      mode === "signin" ? { email, password } : { email, password, name };
    // check zodValidation
    const result =
      mode === "signin"
        ? signInSchema.safeParse(signData)
        : signUpSchema.safeParse(signData);

    if (!result.success) {
      //console.log(result.error.issues[0]);
      toast.error(result.error.issues[0].message, { position: "top-center" });
      return;
    } else {
      // if all above success then call useSign function to sign-in or sign-up
      signMutate({ data: signData, mode });
    }
  }

  function handleForgotPassword() {
    navigate(`/forgot-password`);
  }



  // effect to show/hide PasswordRules
  useEffect(() => {
    setPasswordValidation(validatePasswordInput(password));
  }, [password]);
  // effect to show/hide nameRules
  useEffect(() => {
    setNameValidation(validateNameInput(name));
  }, [name]);

  return (
    <>
      <div className="flex items-center justify-center p-6 lg:w-full mb-10 ">

        {/* Main Card with shadcn/ui styling */}
        <fieldset disabled={isPending}
          className="relative rounded-lg bg-zinc-100 p-6 shadow-md border-2 border-zinc-500 dark:bg-black
          w-sm sm:w-md shadow-black dark:shadow-sm dark:shadow-zinc-300"
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

          <form onSubmit={handleSignFormSubmit} className="space-y-3">
            <div className="flex flex-col gap-4">
              {mode === "signup" ? (
                <div className="space-y-2">
                  {/* Full Name Input */}
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      <UserIcon size={18} />
                    </span>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="pl-10"
                    />
                  </div>
                  <InputValidationFeedback
                    input={name}
                    inputValidation={nameValidation}
                    inputRules={NameRules}
                  />
                </div>
              ) : null}

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <MailIcon size={18} />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label
                  className="justify-between"
                  htmlFor="password"
                >
                  <span>Password</span>
                  {mode === 'signin' &&
                    <button
                      className="cursor-pointer hover:underline"
                      type="button"
                      onClick={() => handleForgotPassword()}
                    >
                      Forgot Password
                    </button>}
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <LockIcon size={18} />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="px-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground focus:outline-none"
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
                <InputValidationFeedback
                  input={password}
                  inputValidation={passwordValidation}
                  inputRules={PasswordRules}
                />
              </div>
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
          </form>


          <div className="space-y-4 pt-4">

            <div className="flex items-center gap-3">
              <span className="border-border dark:border-white h-px flex-1 border-t" />
              <span className="text-muted-foreground text-xs uppercase tracking-wide">
                Or continue with
              </span>
              <span className="border-border h-px flex-1 border-t dark:border-white " />
            </div>

            {/* OAuth section */}
            <div className="flex items-center gap-4 justify-center">
              <OAuthProviderButton label="Google" Icon={GoogleIcon} onClick={() => { }} />
              <OAuthProviderButton label="Github" Icon={GithubIcon} onClick={() => { }} />
              <OAuthProviderButton label="Discord" Icon={DiscordIcon} onClick={() => { }} />
            </div>

            {/* Footer */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                {content.alternateText}{" "}
                <Link

                  to={isPending ? "#" : content.alternateActionRoute}
                  className="hover:text-primary underline underline-offset-4 transition-colors"
                >
                  {content.alternateAction}
                </Link>
              </span>
            </div>
          </div>
        </fieldset>
      </div >
    </>
  );
};

export default SignComp;



type OAuthProviderButtonProps = {
  Icon: React.ForwardRefExoticComponent<any>;
  label: string;
  onClick?: () => void;
};

const OAuthProviderButton = ({
  Icon,
  label,
  onClick,
}: OAuthProviderButtonProps) => {
  const [hovered, setHovered] = useState(false);


  const AnimateRef = useRef<IconHandle>(null);

  return (
    <motion.button
      type="button"
      layout
      onClick={onClick}
      onMouseEnter={() => {
        setHovered(true);
        AnimateRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        setHovered(false);
        AnimateRef.current?.stopAnimation();
      }}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      className="border-input bg-background flex h-9 shrink-0 items-center overflow-hidden rounded-md border px-3 transition-colors"
    >
      <span className="flex shrink-0 items-center justify-center [&_svg]:size-[18px]">
        <Icon ref={AnimateRef} />
      </span>
      <motion.span
        initial={false}
        animate={{
          width: hovered ? "auto" : 0,
          marginLeft: hovered ? 8 : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden text-sm font-medium whitespace-nowrap"
      >
        {label}
      </motion.span>
    </motion.button>
  );
};