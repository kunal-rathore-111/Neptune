import { BrowserIcon, LoaderIcon } from "@repo/icons";
import { DeleteIcon } from "@repo/icons";
import { EditIcon } from "@repo/icons";
import { ShareIcon } from "@repo/icons";
import { ShareOffIcon } from "@repo/icons";
import Tags from "@/lib/utils/Tags";
import { LinkIcon } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { toast } from "@repo/ui";
import { MapCategoryWithIcon } from "@/lib/utils/mapCategoryIcon";
import { deleteService } from "@/services/deleteData";
import { HandleResponseUtil } from "@/lib/utils/handleResponseUtil";

type ContentCardType = {
  cardData: dashboardFetchDataType;
  setSelectedCard: Dispatch<SetStateAction<dashboardFetchDataType | null>>;
};
type actionType = "delete" | "edit" | "toggleShare";
export function ContentCard({ cardData, setSelectedCard }: ContentCardType) {
  const Icon = MapCategoryWithIcon(cardData.contentTable.category);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // handler for icon clicks like delete edit sharetoggle
  async function handleIconAction(
    action: actionType,
    cardData: dashboardFetchDataType,
  ) {
    let response;
    setIsLoading(true);
    if (action === "delete") {
      response = await deleteService(cardData.contentTable.id);
    }

    if (response) {
      HandleResponseUtil(response, null, null);
      if (response.type === "success") window.location.reload();
    }
    setIsLoading(false);
    return;
  }

  return (
    <div className="relative flex h-auto min-h-30 w-78 flex-col justify-between rounded-xl bg-zinc-100 p-3 text-start text-xs shadow-sm shadow-zinc-900 dark:border-4 dark:bg-zinc-950/80 dark:shadow-zinc-300/90">
      {isLoading ? (
        <div className="flex min-h-30 w-full items-center justify-center">
          <LoaderIcon />
        </div>
      ) : (
        <div>
          {/*  header+content of card */}
          <div onClick={() => setSelectedCard(cardData)}>
            {/* for the header of card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* need to map the categroy with icon  */}
                <Icon
                  size={14}
                  className="rounded-sm border-2 border-black/50 p-1 dark:border-white/50"
                />
                <h5 className="text-xs">{cardData.contentTable.category}</h5>
              </div>
              <div className="flex items-center gap-1 text-xs">
                {cardData.ContentShareLinkTable?.contentSharehash ? (
                  <LinkIcon size={14} />
                ) : null}
              </div>
            </div>

            {/* Card content the title and description */}
            <div className="mt-2 flex flex-col gap-2">
              <div>
                <div className="max-w-sm text-xs font-semibold">
                  <TruncatedString
                    str={cardData.contentTable.title}
                    type="title"
                  />
                </div>
              </div>
              <div>
                <div className="max-w-sm text-xs font-thin text-gray-600/90 dark:text-zinc-400/70">
                  {cardData.contentTable.description ? (
                    <TruncatedString
                      str={cardData.contentTable.description}
                      type="description"
                    />
                  ) : null}
                </div>
              </div>
              {cardData.contentTable.tags ? (
                <div>
                  <div className="mt-2 max-w-sm text-sm">
                    <Tags
                      tags={cardData.contentTable.tags}
                      sliceCount={7}
                    />{" "}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          {/* last section the date and the 4 updations buttons */}
          <div
            className={"mt-4 flex w-full items-center justify-between text-xs"}
          >
            {/* need to change with date */}
            <div>date</div>
            <div className="flex gap-2">
              {[
                {
                  Icon: EditIcon,
                  className: "text-black dark:text-white",
                  action: () => {
                    handleIconAction("edit", cardData);
                  },
                },
                {
                  Icon: cardData.ContentShareLinkTable?.contentSharehash
                    ? ShareIcon
                    : ShareOffIcon,
                  className: "text-black dark:text-white",
                  action: () => {
                    handleIconAction("toggleShare", cardData);
                  },
                },
                {
                  Icon: DeleteIcon,
                  className: "text-red-500",
                  action: () => {
                    handleIconAction("delete", cardData);
                  },
                },
                /* now add BrowserIcon only if link available */
                ...(cardData.contentTable.link
                  ? [
                      {
                        Icon: BrowserIcon,
                        className: "text-lime-600 ",
                        action: () => {
                          toast("open link");
                        },
                      },
                    ]
                  : []),
              ].map((x, idx) => (
                <div key={idx} onClick={() => x.action()}>
                  <x.Icon className={x.className} size={14} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TruncatedString({
  str,
  type,
}: {
  str: string;
  type: "description" | "title";
}) {
  const maxLength = type === "title" ? 30 : 45;
  if (str.length <= maxLength) return <p>{str}</p>;
  return <p>{str.slice(0, maxLength)}....</p>;
}
