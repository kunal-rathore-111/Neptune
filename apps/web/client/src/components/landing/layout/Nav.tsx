import { useNavigate } from "react-router";
import { GithubIcon, NeptunePlanetIcon } from "@repo/icons";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  animateIconUsingRef,
  Button,
  type IconHandle,
  ThemeToggleButton,
} from "@repo/ui";
import { GithubRepoUrl } from "@/api/urls";

export const Nav = () => {
  const navigate = useNavigate();
  const animateRef = useRef<IconHandle>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const NavFunctionalComps = [
    { label: "Features", action: () => handleScrollTo("features") },
    { label: "Blog", action: () => { } },
    { label: "Docs", action: () => navigate("/docs") },
    // will update later after comletion of dashboard page to only when authenticated
    { label: "Dashboard", action: () => navigate("/user/dashboard") },
    {
      label: "SharedProfile",
      action: () => navigate("/user/public/shared/profile"),
    },
  ];

  const handleScrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300">
      <nav className="mx-auto flex h-14.5 w-full items-center bg-white/20 px-8 backdrop-blur-sm dark:bg-black/0">
        <div className="flex gap-10">
          <div
            className="flex cursor-pointer items-center"
            id="top"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            <div
              className="flex items-center gap-1"
              {...animateIconUsingRef(animateRef)}
            >
              <div className="flex size-6 items-center justify-center rounded-[7px]">
                <NeptunePlanetIcon
                  ref={animateRef}
                  size={23}
                  className="text-zinc-900 dark:text-zinc-100"
                />
              </div>
              <span className="font-bold tracking-[-0.03em] text-zinc-900 dark:text-zinc-100">
                Neptune
              </span>
            </div>
          </div>

          <motion.div
            className="flex items-center justify-center gap-1"
            onMouseLeave={() => setHovered(null)}
          >
            {NavFunctionalComps.map(({ label, action }, idx) => (
              <motion.button
                key={idx}
                onClick={action}
                className="relative z-10 rounded-md bg-transparent px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                onMouseEnter={() => setHovered(idx)}
              >
                {hovered === idx && (
                  <motion.span
                    layoutId="idx"
                    className="absolute inset-0 -z-10 h-full w-full rounded-lg bg-zinc-200/70 dark:bg-zinc-100/20"
                  ></motion.span>
                )}
                {label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggleButton />
          <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
          <a
            href={GithubRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex size-7 items-center justify-center rounded-sm text-zinc-400 transition-all duration-400 hover:bg-zinc-200 hover:text-zinc-700 dark:text-zinc-500 hover:dark:bg-zinc-800 hover:dark:text-zinc-200"
          >
            <GithubIcon size={18} />
          </a>
          <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
          <Button
            variant={"secondary"}
            onClick={() => navigate("/sign-in")}
            size="sm"
            className="rounded-sm text-xs transition-colors duration-400 hover:bg-zinc-300 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
          >
            Sign In
          </Button>

          <Button
            onClick={() => navigate("/sign-up")}
            size="sm"
            className="rounded-sm text-xs transition-colors duration-400"
          >
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
};
