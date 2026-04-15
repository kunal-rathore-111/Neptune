import {
  ChartBarDecreasingIcon,
  CodeIcon,
  DatabaseIcon,
  HomeIcon,
  ShareIcon,
  TagIcon,
  type LucideIcon,
} from "lucide-react";

export type SideBarMenuDataTypes = {
  SidebarMenuButtonIcon: LucideIcon;
  SidebarMenuButtonName: string;
  CollapsedData?: {
    CollapsedDataIcon?: LucideIcon;
    CollapsedDataButtonName: string;
  }[];
};

export const SideBarMenuData: SideBarMenuDataTypes[] = [
  /* 1 home */
  {
    SidebarMenuButtonIcon: HomeIcon,
    SidebarMenuButtonName: "Home",
  },
  /* 2nd Categories */
  {
    SidebarMenuButtonIcon: DatabaseIcon,
    SidebarMenuButtonName: "Categories",
    CollapsedData: [
      { CollapsedDataIcon: DatabaseIcon, CollapsedDataButtonName: "All" },
      { CollapsedDataIcon: CodeIcon, CollapsedDataButtonName: "Development" },
      {
        CollapsedDataIcon: ChartBarDecreasingIcon,
        CollapsedDataButtonName: "Design",
      },
    ],
  },
  /* 3rd Tags */
  {
    SidebarMenuButtonIcon: TagIcon,
    SidebarMenuButtonName: "Tags",
    CollapsedData: [
      { CollapsedDataButtonName: "# All" },
      { CollapsedDataButtonName: "# Development" },
      {
        CollapsedDataButtonName: "# Design",
      },
      { CollapsedDataButtonName: "# All2" },
      { CollapsedDataButtonName: "# Development2" },
      {
        CollapsedDataButtonName: "# Design2",
      },
    ],
  },
  /* 4th Shared */
  {
    SidebarMenuButtonIcon: ShareIcon,
    SidebarMenuButtonName: "Shared",
  },
];
