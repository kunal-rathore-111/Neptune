import type { CategoryType } from "@repo/libs";

export type SharedContentDataType = {
  contentTable: {
    id: string;
    title: string;
    description: string | null;
    link: string;
    category: CategoryType;
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
