import { HandleResponseUtil } from "@/lib/utils/handleResponseUtil";
import { deleteBookMarkService } from "@/services/deleteData";
import {
  toggleShareService,
  type toggleShareServiceInputType,
} from "@/services/toggleShare";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import type { SharedContentDataType } from "@/Types/sharedContent";

import {
  BrowserIcon,
  DeleteIcon,
  EditIcon,
  ShareIcon,
  ShareOffIcon,
} from "@repo/icons";
import { toast } from "@repo/ui";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

type actionType = "delete" | "edit" | "toggleShare";

type reactQueryActionsType = {
  deleteMutate: UseMutateFunction<string, any, string, unknown>;
  isDeletePending: boolean;
  toggleShareMutate: UseMutateFunction<
    string,
    any,
    toggleShareServiceInputType,
    unknown
  >;
  isToggleSharePending: boolean;
};
type cardEDUBType = {
  cardData: dashboardFetchDataType | SharedContentDataType;
  setEditCardState: Dispatch<SetStateAction<boolean>>;
  reactQueryActions: reactQueryActionsType;
  setSelectedCard?: Dispatch<SetStateAction<dashboardFetchDataType | null>>;
};

// both types cause using in users dashboard (dashboardFetchDataType) and also in SharedContent LongPageLayout(SharedContentDataType ) and also as longPageOutline(dashboardFetchDataType)
export function cardEDUB(props: cardEDUBType) {
  // handler for icon clicks like delete edit sharetoggle

  async function handleIconAction(
    action: actionType,
    cardData: dashboardFetchDataType | SharedContentDataType,
  ) {
    if (action === "edit") {
      props.setEditCardState(true);
    } else {
      if (action === "delete") {
        props.reactQueryActions.deleteMutate(props.cardData.contentTable.id, {
          onSuccess: () => {
            props.setSelectedCard && props.setSelectedCard(null);
          },
        });
      } else if (action === "toggleShare") {
        const data = {
          contentId: cardData.contentTable.id,
          share: cardData.ContentShareLinkTable?.contentSharehash
            ? false
            : true, // if shareHash present means revert
        };
        props.reactQueryActions.toggleShareMutate(data, {
          onSuccess: () => {
            props.setSelectedCard && props.setSelectedCard(null);
          },
        });
      }
    }
    return;
  }

  // link openner handler
  function handleLinkOpenner(link: string) {
    try {
      // first need to validate url
      let finalUrl;
      if (!link.includes(".")) throw new Error(); // if no dot (.) means invalid
      // trim the link spaces if someone did space in front or at end
      link = link.trim();
      try {
        finalUrl = new URL(link); // if not valid throws error
      } catch (error) {
        finalUrl = new URL("https://" + link); // makes url valid for eg- google.com or www.goggle.com -> converts in, https://www.google.com AND IF FAILS THROWS ERROR
      }
      window.open(finalUrl.href, "_blank", "noopener,noreferrer");
    } catch (error) {
      // console.log(link);
      toast.error("Invalid Url", { position: "top-center" });
    }
  }

  /* arrays */

  const BrowserIconArray = props.cardData.contentTable?.link
    ? [
      {
        Icon: BrowserIcon,
        className: "text-lime-600 ",
        label: "Open link",
        action: () => {
          if (props.cardData.contentTable.link) {
            handleLinkOpenner(props.cardData.contentTable.link);
          } else {
            //even no need of else (the icon will not show if link not present)
            toast.error("No link found to open", {
              position: "top-center",
            });
          }
        },
      },
    ]
    : null;
  /* array with icons of delete, edit, update and browser */
  const EDUBArray = [
    {
      Icon: EditIcon,
      label: "Edit",
      className: "text-black dark:text-white",
      action: () => {
        handleIconAction("edit", props.cardData);
      },
    },
    {
      Icon: props.cardData.ContentShareLinkTable?.contentSharehash
        ? ShareIcon
        : ShareOffIcon,
      className: "text-black dark:text-white",
      label: "Toggle Share",
      action: () => {
        handleIconAction("toggleShare", props.cardData);
      },
    },
    {
      Icon: DeleteIcon,
      className: "text-red-500",
      label: "Delete",
      action: () => {
        handleIconAction("delete", props.cardData);
      },
    },
    /* now add BrowserIcon only if link available */
    ...(BrowserIconArray ?? []),
  ];

  return { BrowserIconArray, EDUBArray };
}
