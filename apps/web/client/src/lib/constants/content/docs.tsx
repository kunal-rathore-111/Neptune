import {
  FolderKanban,
  Puzzle,
  Search,
  Share2,
  ShieldCheck,
  Tags,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router";

export interface StepsArrayDTO {
  title: string;
  description: string;
}

export const StepsArray: StepsArrayDTO[] = [
  {
    title: "Step 1 - Sign up",
    description:
      "Create a free account in under 30 seconds. No credit card required.",
  },
  {
    title: "Step 2 - Save",
    description:
      "Add your first bookmark using the dashboard or browser extension.",
  },
  {
    title: "Step 3 - Organize",
    description:
      "Add tags and assign categories to keep everything structured.",
  },
  {
    title: "Step 4 - Search",
    description: "Use instant search to find anything — titles, URLs, or tags.",
  },
];

export interface FeaturesArrayDTO {
  icon: LucideIcon;
  title: string;
  description: string;
}
export const FeaturesArray: FeaturesArrayDTO[] = [
  {
    icon: Search,
    title: "Instant Search",
    description:
      "Search across all your bookmarks by title, URL, tag, or description. Results appear as you type — no loading, no waiting.",
  },
  {
    icon: Tags,
    title: "Tags",
    description:
      "Add any number of tags to each bookmark. Tags are colour-coded and searchable. Expand the Tags section in the sidebar to filter by any tag.",
  },
  {
    icon: FolderKanban,
    title: "Categories",
    description:
      "Every bookmark belongs to a category — Development, Design, Productivity, DevOps, AI & Research, or Finance. Categories group your library automatically.",
  },
  {
    icon: Share2,
    title: "Sharing",
    description:
      "Toggle sharing on any bookmark to get a permanent public link. The public page shows the title, URL, tags, and description. You can turn sharing off at any time.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy",
    description:
      "Bookmarks are private by default. Nothing is visible to anyone unless you explicitly share it. No ads, no data selling.",
  },
  {
    icon: Puzzle,
    title: "Browser Extension",
    description:
      "Install the extension for Chrome, Firefox, or Safari. Click the icon on any page to save instantly without leaving your current tab.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "2nd Mind is built for speed. The dashboard loads instantly, search is real-time, and bookmarks sync immediately across devices.",
  },
];

export const TipsArray = [
  {
    text: (
      <>
        Create a free account on the{" "}
        <Link
          className="font-bold text-zinc-600 underline dark:text-zinc-400"
          to={"/sign-up"}
        >
          Sign Up page
        </Link>
        .
      </>
    ),
  },

  {
    text: (
      <>
        You'll land on the Dashboard. Click{" "}
        <span className="font-bold text-zinc-600 dark:text-zinc-400">
          + Add
        </span>{" "}
        to save your first bookmark.
      </>
    ),
  },
  {
    text: "Assign a category and tags. Categories live in the sidebar; tags let you cross-reference across categories.",
  },
  {
    text: (
      <>
        Use the{" "}
        <span className="font-bold text-zinc-600 dark:text-zinc-400">
          search bar
        </span>{" "}
        to find bookmarks instantly. You can search by title, URL, or tag.
      </>
    ),
  },
  {
    text: (
      <>
        Click the
        <span className="font-bold text-zinc-600 dark:text-zinc-400">
          {" "}
          share toggle{" "}
        </span>{" "}
        on any bookmark to generate a public link. Share it anywhere — it's
        permanent until you turn sharing off.
      </>
    ),
  },
];
