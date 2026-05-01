import { CheckIcon, LoaderIcon } from "@repo/icons";
import Tags from "@/lib/utils/Tags";
import { LinkIcon } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { toast, Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui";
import { MapCategoryWithIcon } from "@/lib/utils/mapCategoryIcon";
import { Add_Edit_BookMarkCard } from "./Add_Edit_Bookmark";
import { ContentShareUrl } from "@/api/urls";
import { cardEDUB } from "@/lib/constants/content/cardEDUB.Array";
import { useDeleteBookmark } from "@/hooks/react-query-hooks/useDeleteBookmark";
import { useToggleShare } from "@/hooks/react-query-hooks/useToggleShare";

type ContentCardType = {
  cardData: dashboardFetchDataType;
  setSelectedCard: Dispatch<SetStateAction<dashboardFetchDataType | null>>;
};
export function ContentCard({ cardData, setSelectedCard }: ContentCardType) {
  const Icon = MapCategoryWithIcon(cardData.contentTable.category);

  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteBookmark();
  const { mutate: toggleShareMutate, isPending: isToggleSharePending } =
    useToggleShare();
  const reactQueryActions = {
    // to pass them to edubarray
    deleteMutate,
    isDeletePending,
    toggleShareMutate,
    isToggleSharePending,
  };

  const [editCardState, setEditCardState] = useState<boolean>(false);

  const [copyIconState, setCopyIconState] = useState<boolean>(false);
  // handler to copy the card's shared url
  async function handleCopy() {
    try {
      const url =
        ContentShareUrl +
        `/${cardData.ContentShareLinkTable?.contentSharehash} `;
      await navigator.clipboard.writeText(url);
      setCopyIconState(true);
      toast.success("Link copied successfully", { position: "top-center" });
      setTimeout(() => {
        setCopyIconState(false);
      }, 1500);
    } catch (error) {
      toast.error("Link not copied, Something went wrong!!", {
        position: "top-center",
      });
    }
  }

  const { EDUBArray } = cardEDUB({
    setEditCardState,
    cardData,
    reactQueryActions,
  });

  const date = cardData.contentTable.updatedDate.toString().slice(0, 10);

  return (
    <div className="relative flex h-auto min-h-30 w-78 flex-col justify-between rounded-xl bg-zinc-100 p-3 text-start text-xs shadow-sm shadow-zinc-900 dark:border-4 dark:bg-[#100A10] dark:shadow-zinc-300/90">
      {isDeletePending || isToggleSharePending ? (
        <div className="flex min-h-30 w-full items-center justify-center">
          <LoaderIcon />
        </div>
      ) : (
        <div>
          {/*  header+content of card */}
          <div>
            {/* for the header of card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon
                  size={14}
                  className="rounded-sm border-2 border-black/50 p-1 dark:border-white/50"
                />
                <h5 className="text-xs">{cardData.contentTable.category}</h5>
              </div>
              <div className="flex items-center gap-1 text-xs">
                {cardData.ContentShareLinkTable?.contentSharehash ? (
                  <div className="flex" onClick={() => handleCopy()}>
                    {/* if copyIconstate is true means the link is getting copy so show the animated checkIcon */}
                    {copyIconState ? (
                      <CheckIcon size={14} />
                    ) : (
                      <Tooltip>
                        <TooltipTrigger>
                          <LinkIcon size={14} />
                          <TooltipContent>Copy share link</TooltipContent>
                        </TooltipTrigger>
                      </Tooltip>
                    )}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Card content the title and description */}
            <div
              className="mt-2 flex flex-col gap-2"
              onClick={() => setSelectedCard(cardData)}
            >
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
            <div className="text-xs">{date}</div>
            <div className="flex gap-2">
              {EDUBArray.map((x, idx) => (
                <Tooltip key={idx}>
                  <TooltipTrigger asChild className="flex">
                    <button onClick={() => x.action()}>
                      <x.Icon className={x.className} size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{x.label}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
          {/* render the edit card for the relevant card */}
          {editCardState && (
            <Add_Edit_BookMarkCard
              setOpenAdd_Edit_Card={setEditCardState}
              presentData={cardData}
            />
          )}
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
