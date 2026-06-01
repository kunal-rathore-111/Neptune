import type { CategoryType } from "@repo/libs";

export type dashboardFetchDataType = {
  contentTable: {
    id: string;
    userId: string;
    title: string;
    link: string;
    description: string | null;
    category: CategoryType;
    tags: string[] | null;
    createdDate: Date;
    updatedDate: Date;
  };
  ContentShareLinkTable: {
    id: string;
    shareHash: string;
    contentId: string;
  } | null;
};
