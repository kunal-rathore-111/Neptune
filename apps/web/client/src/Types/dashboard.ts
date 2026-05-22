export type dashboardFetchDataType = {
  contentTable: {
    id: string;
    userId: string;
    title: string;
    link: string;
    description: string | null;
    category: "Development" | "Finance" | "Study" | "Social" | "GitHub" | "Exams" | "AI" | "Research" | "Design" | "Others";
    tags: string[] | null;
    createdDate: Date;
    updatedDate: Date;
  };
  ContentShareLinkTable: {
    id: string;
    shareHash: string;
    contentId: string;
  } | null;
}