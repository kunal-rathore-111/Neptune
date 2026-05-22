export type SharedContentDataType = {
  contentTable: {
    id: string;
    title: string;
    description: string | null;
    link: string;
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
    tags: string[] | null;
    userId: string;
    createdDate: Date;
    updatedDate: Date;
  };
  ContentShareLinkTable: {
    id: string;
    shareHash: string;
    contentId: string;
  };
};
