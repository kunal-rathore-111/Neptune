import { BrowserIcon } from "@repo/icons";
import { DeleteIcon } from "@repo/icons";
import { EditIcon } from "@repo/icons";
import { ShareIcon } from "@repo/icons";
import { ShareOffIcon } from "@repo/icons";
import Tags from "@/lib/utils/Tags";
import { LinkIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { toast } from "@repo/ui";
import { MapCategoryWithIcon } from "@/lib/utils/mapCategoryIcon";

export function ContentCard({
  cardData,
  setSelectedCard,
}: {
  cardData: dashboardFetchDataType;
  setSelectedCard: Dispatch<SetStateAction<dashboardFetchDataType | null>>;
}) {
  const Icon = MapCategoryWithIcon(cardData.contentTable.category);
  return (
    <div className="relative flex h-auto flex-col justify-between rounded-xl bg-zinc-100 p-3 text-start text-xs shadow-sm shadow-zinc-900 dark:border-4 dark:bg-zinc-950/80 dark:shadow-zinc-300/90">
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
              <TruncatedString str={cardData.contentTable.title} type="title" />
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
                <Tags tags={cardData.contentTable.tags} />{" "}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* last section the date and the 4 updations buttons */}
      <div className={"mt-4 flex w-full items-center justify-between text-xs"}>
        {/* need to change with data */}
        <div>{cardData.contentTable.link}</div>
        <div className="flex gap-2">
          {[
            {
              Icon: EditIcon,
              className: "text-black dark:text-white",
              action: () => {
                toast("open edit page");
              },
            },
            {
              Icon: cardData.contentTable.link ? ShareIcon : ShareOffIcon,
              className: "text-black dark:text-white",
              action: () => {
                toast("toggle share ");
              },
            },
            {
              Icon: DeleteIcon,
              className: "text-red-500",
              action: () => {
                toast("delete content");
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
  );
}

function TruncatedString({
  str,
  type,
}: {
  str: string;
  type: "description" | "title";
}) {
  const maxLength = type === "title" ? 50 : 120;
  if (str.length <= maxLength) return <p>{str}</p>;
  return <p>{str.slice(0, maxLength)}....</p>;
}
