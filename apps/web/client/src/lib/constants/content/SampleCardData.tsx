import { CodeIcon } from "@repo/icons";
import { ExamIcon } from "@repo/icons";
import { GithubIcon } from "@repo/icons";

export interface CardDTO {
  categoryIcon: typeof CodeIcon;
  category: string;
  contentTitle: string;
  contentDescription: string;
  tags: string[];
  date: string;
  isShared: boolean;
}

export const card1 = {
  categoryIcon: CodeIcon,
  category: "Development",
  contentTitle: "React - The library for web and native user interfaces",
  contentDescription:
    "React lets    React lets you build user interfaces out of individual pieces called components.",
  tags: ["react", "frontend", "ui", "pio", "900"],
  isShared: true,
  date: "2026-01-15",
};

export const card2 = {
  categoryIcon: GithubIcon,
  category: "Github",
  contentTitle: "Github - Open Source roadmap",
  isShared: false,
  contentDescription:
    "GitHub provides a structured path to explore open source and contribute effectively.",
  tags: ["github", "open-source"],
  date: "2026-02-10",
};

export const card3 = {
  categoryIcon: ExamIcon,
  category: "Exam",
  contentTitle: "Exam Prep - Organize topics, notes, and practice sets",
  isShared: true,
  contentDescription:
    "Keep your syllabus, revision links, and mock tests in one place for faster exam preparation.",
  tags: ["exam", "practice"],
  date: "2026-04-04",
};
