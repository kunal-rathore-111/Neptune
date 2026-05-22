import { MapCategoryWithIcon } from "@/lib/utils/mapCategoryIcon";
import Tags from "@/lib/utils/Tags";

import type { dashboardFetchDataType } from "@/Types/dashboard";
import { LoaderIcon, type XIcon } from "@repo/icons";
import { HomeButton, ThemeToggleButton } from "@repo/ui";
import { LinkIcon } from "lucide-react";
import type { SharedContentDataType } from "@/Types/sharedContent";
import { useCardEDUB } from "@/hooks/useCardEDUB.Array";
import { Add_Edit_BookMarkCard } from "../dashboard/DashboardComps/Add_Edit_Bookmark";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setLongSelectedCard } from "@/store/uiSlice";

type LongCardOutlineCompType = {
  Icon?: typeof XIcon;
  ThemeButton?: typeof ThemeToggleButton;
  selectedCardData: dashboardFetchDataType | SharedContentDataType;
};

export function LongCardOutlineComp(props: LongCardOutlineCompType) {
  const Icon = MapCategoryWithIcon(
    props.selectedCardData.contentTable.category,
  );

  const editCardState = useSelector(
    (state: RootState) => state.ui?.editCardState,
  );
  const dispatch = useDispatch();

  const { EDUBArray, isDeletePending, isToggleSharePending } =
    useCardEDUB({
      cardData: props.selectedCardData,
      type: "sharedContent",
    });

  const date = props.selectedCardData.contentTable.updatedDate
    .toString()
    .slice(0, 10);


  return (
    <div className="fixed inset-0 z-10 flex max-h-screen items-center justify-center bg-black/5 backdrop-blur-[3px]">
      <div className="relative flex h-fit max-h-[90vh] min-h-50 max-w-200 min-w-90 flex-col rounded-xl border bg-zinc-100 p-7 text-start text-xs shadow-sm shadow-zinc-900 dark:border dark:bg-[#100A10] dark:shadow-zinc-600/90">
        {isDeletePending || isToggleSharePending ? (
          <div className="flex h-full min-h-50 w-full items-center justify-center">
            <LoaderIcon />
          </div>
        ) : (
          <div>
            {props.Icon ? (
              <span className="absolute -top-2 -right-2 z-10 rounded-full border bg-zinc-300 p-0.5">
                <props.Icon
                  onClick={() => {
                    dispatch(setLongSelectedCard(null));
                  }}
                  className="text-zinc-900"
                  size={18}
                />
              </span>
            ) : null}

            {/* to gap bw the entire data and the date part  */}
            <div className="space-y-12 overflow-y-auto">
              {/*  header+content of card */}
              <div className="space-y-6">
                {/* for the header of card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon
                      size={16}
                      className="rounded-sm border-2 border-black/50 p-1 dark:border-white/50"
                    />
                    <h5 className="text-sm">

                      {props.selectedCardData.contentTable.category}
                    </h5>
                  </div>
                  {/* show only if shareHash present + in users Dashboard using themeButton as condition */}
                  {props.selectedCardData.ContentShareLinkTable
                    ?.shareHash && !props.ThemeButton ? (
                    <div className="flex items-center gap-1 text-sm">
                      <LinkIcon size={16} />
                      <span className="text-sm">Shared</span>
                    </div>
                  ) : /* else show a themetoggle button if not user's dashboard */
                    props.ThemeButton ? (
                      <div className="flex gap-2">
                        <HomeButton />
                        <props.ThemeButton />
                      </div>
                    ) : null}
                </div>

                {/* Card content the title and description */}
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="text-sm font-semibold wrap-break-word">
                      Title: {props.selectedCardData.contentTable.title}
                    </div>
                  </div>
                  <div className="space-y-5">
                    {props.selectedCardData.contentTable.description ? (
                      <div>
                        <div className="text-sm font-thin wrap-break-word text-gray-600/90 dark:text-zinc-400/70">
                          Description:{" "}
                          {props.selectedCardData.contentTable.description}
                        </div>
                      </div>
                    ) : null}

                    {props.selectedCardData.contentTable.tags ? (
                      <div>
                        <div className="max-w-sm text-sm">
                          <Tags
                            tags={props.selectedCardData.contentTable.tags}
                            sliceCount={100}
                          />{" "}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {/* last section the date and the 4 updations buttons */}
              <div
                className={"flex w-full items-center justify-between text-sm"}
              >
                {/* need to change to date */}
                <div>{date} </div>

                {/*  show the icons of edit update and delete only when the card is loaded in users dashboard not when the card was as the sharedCart (which can be identified by themeButton) */}
                {props.ThemeButton ? (
                  <div>
                    <a
                      href={props.selectedCardData.contentTable.link}
                      rel="noopener norefferer"
                      target="_blank"
                      className="cursor-pointer rounded px-1 py-0.5 underline"
                    >
                      Link
                    </a>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    {EDUBArray.map((x, idx) => (
                      <div key={idx} onClick={() => x.action()}>
                        <x.Icon className={x.className} size={16} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* render the edit card for the relevant card */}
            {editCardState && <Add_Edit_BookMarkCard type="edit" />}
          </div>
        )}
      </div>
    </div>
  );
}
