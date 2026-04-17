"use client";
import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { GithubIcon, GoogleIcon } from "@repo/icons";
import { Button, FloatingLabelInput } from "@repo/ui";
import { ThemeHomeComp } from "@repo/ui";

type AuthMode = "signin" | "signup";

const authContent = {
  signin: {
    heading: "Welcome back",
    subheading: "Enter your details to sign in",
    buttonTitle: "Login",
    alternateText: "Don't have an account? ",
    alternateAction: "Sign up",
    alternateActionRoute: "/signup",
  },

  signup: {
    heading: "Create an account",
    subheading: "Enter your details below to create your account",
    buttonTitle: "Create Account",
    alternateText: "Already have an account? ",
    alternateAction: "Sign in",
    alternateActionRoute: "/signin",
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
  const [fullName, setFullName] = useState<string>("");

  const cardRef = useRef<HTMLDivElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

            <form className="space-y-4">
              {/* Full Name Input */}
              <div className="space-y-2">
                <FloatingLabelInput
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  icon={<UserIcon />}
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <FloatingLabelInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  icon={<MailIcon />}
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
                  icon={<LockIcon />}
                  rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  onRightIconClick={togglePasswordVisibility}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                {content.buttonTitle}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="border-border w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="text-muted-foreground bg-white px-2 dark:bg-black">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                asChild
                className="border-2 border-dashed border-zinc-900/90 bg-zinc-300/20 text-black transition-colors duration-600 hover:bg-zinc-400/70 dark:border-zinc-300/60 dark:text-white"
              >
                <span className="flex">
                  <GithubIcon />
                  <span className="ml-2">GitHub</span>
                </span>
              </Button>
              <Button type="button" asChild>
                <span className="flex">
                  <GoogleIcon />
                  <span className="ml-2">Google</span>
                </span>
              </Button>
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
      </div>
    </>
  );
};

export default SignComp;
