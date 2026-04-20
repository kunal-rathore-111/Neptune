import {
  NotFoundIcon,
  CodeIcon,
  FinanceIcon,
  StudyIcon,
  SocialIcon,
  GithubIcon,
  ExamIcon,
  ArtificialIntelligenceIcon,
  ResearchIcon,
  DesignIcon,
  OthersIcon,
} from "@repo/icons";

const categoryIconMap: Record<string, typeof NotFoundIcon> = {
  Development: CodeIcon,
  Finance: FinanceIcon,
  Study: StudyIcon,
  Social: SocialIcon,
  GitHub: GithubIcon,
  Exams: ExamIcon,
  AI: ArtificialIntelligenceIcon,
  Research: ResearchIcon,
  Design: DesignIcon,
  Others: OthersIcon,
};

export function MapCategoryWithIcon(category: string): typeof NotFoundIcon {
  return categoryIconMap[category] || NotFoundIcon;
}
