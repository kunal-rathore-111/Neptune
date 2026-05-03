export type dashboardFetchDataType = {
  contentTable: {
    id: string;
    title: string;
    description: string | null;
    link: string | null;
    category:
      | "Development"
      | "Finance"
      | "Study"
      | "Social"
      | "GitHub"
      | "Exams"
      | "AI"
      | "Research"
      | "Design"
      | "Others";
    tags?: string[];
    userId: string;
    createdDate: Date;
    updatedDate: Date;
  };
  ContentShareLinkTable: {
    id: string;
    contentSharehash: string;
    contentId: string;
  } | null;
};
