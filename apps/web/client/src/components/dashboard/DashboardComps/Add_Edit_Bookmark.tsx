import { Link } from "lucide-react";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";

import { LinkIcon } from "@repo/icons";
import { KeyboardIcon } from "@repo/icons";
import { XIcon } from "@repo/icons";
import { Button, Field, FieldGroup, FieldLabel, toast } from "@repo/ui";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@repo/ui";
import { Textarea } from "@repo/ui";
import { Checkbox } from "@repo/ui";
import { TagsInputComp } from "@repo/ui";
import {
  type addBookmarkDataType,
  type editBookmarkDataType,
} from "@/services/add_edit_Data";
import {
  contentZodSchema,
  validateDescriptionInput,
  validateLinkInput,
  validateTitleInput,
} from "@repo/validation";
import { InputValidationFeedback } from "@/components/sign/InputValidationFeedback";
import { useAdd_EditBookmark } from "@/hooks/react-query-hooks/useAdd_EditBookmark";
import { useDispatch, useSelector } from "react-redux";
import { setAddBookMarkState, setEditCardState } from "@/store/uiSlice";
import type { RootState } from "@/store";
import { useMagicFill } from "@/hooks/react-query-hooks/useMagicFill";

interface AddBookMarkCardDTO {
  type: "add" | "edit";
}

export function Add_Edit_BookMarkCard(props: AddBookMarkCardDTO) {
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [share, setIsShareable] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("Others");

  const editCardState = useSelector(
    (state: RootState) => state.ui.editCardState,
  );
  useEffect(() => {
    if (props.type === "edit" && editCardState) {
      setDescription(editCardState.contentTable.description || "");
      setLink(editCardState.contentTable.link || "");
      setTitle(editCardState.contentTable.title);
      setTags(editCardState.contentTable.tags || []);
      setIsShareable(
        editCardState.ContentShareLinkTable?.shareHash ? true : false,
      );
      setCategory(editCardState.contentTable.category || "Others");
    }
    // eslint-disable-next-line
  }, []);

  const inputs = {
    description,
    setDescription,
    link,
    setLink,
    title,
    setTitle,
    tags,
    setTags,
    share,
    setIsShareable,
    category,
    setCategory,
  };

  const dispatch = useDispatch();
  const { mutate: useMagicFillMutation, isPending: isMagicFillPending } =
    useMagicFill();

  const { mutate: add_edit_MutateFn, isPending: add_edit_isPending } =
    useAdd_EditBookmark();

  function handleMagicFill() {
    if (!inputs.link.includes(".")) {
      toast.error("Invalid URL", { position: "top-center" });
    } else {
      // the url cleaning is doing in backend in the magicFill controller
      // call backend to get data
      useMagicFillMutation(inputs.link, {
        onSuccess: (useMagicFillResponse) => {
          if (useMagicFillResponse && useMagicFillResponse.type === "success") {
            const data = useMagicFillResponse.data;
            inputs.setTitle(data.title);
            inputs.setCategory(data.category);
            inputs.setDescription(data.description);
            inputs.setTags(data.tags);
          }
        },
      });
    }
  }
  function handleAdd_Edit_BookMarkFormSubmit(e: FormEvent) {
    e.preventDefault();

    let data: addBookmarkDataType | editBookmarkDataType = {
      description,
      link,
      title,
      tags: [...new Set(tags.map((tag) => tag.trim().toLowerCase()))],
      share,
      category,
    };
    if (props.type === "edit" && editCardState) {
      data = { ...data, id: editCardState.contentTable.id };
    }
    // full data validation-  description, link, title, tags, share, category
    const result = contentZodSchema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.issues[0].message, { position: "top-right" });
    } else {
      const type = props.type === "edit" ? "edit" : "add";
      /*  service call */
      add_edit_MutateFn(
        { data, type },
        {
          onSuccess: () => {
            if (props.type === "add") dispatch(setAddBookMarkState(false));
            else if (props.type === "edit") dispatch(setEditCardState(null));
          },
        },
      );
    }
  }

  /*  useffect to stop background scroll the body (same code was also in the longCardComp) */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 flex max-h-screen items-center justify-center bg-black/30 backdrop-blur-xs">
        <div className="relative flex h-full max-h-[90vh] w-150 flex-col rounded-xl border bg-zinc-100 p-7 text-start text-xs shadow-sm shadow-zinc-900 dark:bg-zinc-950/80 dark:shadow-zinc-300/90">
          <span className="absolute -top-2 -right-2 z-20 rounded-full border-2 bg-zinc-300 p-0.5">
            {
              <XIcon
                onClick={() => {
                  if (props.type === "add")
                    dispatch(setAddBookMarkState(false));
                  else if (props.type === "edit")
                    dispatch(setEditCardState(null));
                }}
                className="text-zinc-800"
                size={18}
              />
            }
          </span>

          <div className="overflow-y-auto px-10">
            <form onSubmit={(e) => handleAdd_Edit_BookMarkFormSubmit(e)}>
              <fieldset className="space-y-6" disabled={add_edit_isPending}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link
                      size={26}
                      className="rounded-sm border-2 border-black/50 p-1 dark:border-white/50"
                    />
                    <h5 className="text-sm">
                      {props.type === "add" ? "Add" : "Edit"} Bookmark
                    </h5>
                  </div>
                  {inputs.link && (
                    <Button
                      size={"xs"}
                      variant={"outline"}
                      className="p-3 dark:border-white"
                      onClick={() => {
                        handleMagicFill();
                      }}
                      type="button"
                      disabled={isMagicFillPending}
                    >
                      {isMagicFillPending ? "Filling..." : "Magic-Fill"}
                    </Button>
                  )}
                </div>

                {/* Input bars section */}
                <InputSection inputs={inputs} />
                {/* Submit Button */}
                <button
                  type="submit"
                  className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 mt-2 inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Submit
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

type inputsType = {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  share: boolean;
  setIsShareable: Dispatch<SetStateAction<boolean>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
};

function InputSection({ inputs }: { inputs: inputsType }) {
  const categoryArray = [
    "Others",
    "Development",
    "Finance",
    "Study",
    "Social",
    "GitHub",
    "Exams",
    "AI",
    "Research",
    "Design",
  ];

  const filteredCategoryArray = [
    inputs.category,
    ...categoryArray.filter((cat) => cat != inputs.category),
  ];
  function handleCategorySelection(e: ChangeEvent<HTMLSelectElement>) {
    inputs.setCategory(e.target.value);
  }

  // common rule for title, description, url (array cause mapping them in InputValidationFeedback.tsx / comp)
  const CommonRule = [
    {
      message: "Length atleast has 4 letters",
      test: (p: string) => p.length > 3,
    },
  ];

  const [descriptionValidation, setDescriptionValidation] = useState<any>();
  const [linkValidation, setLinkValidation] = useState<any>();
  const [titleValidation, setTitleValidation] = useState<any>();

  useEffect(() => { }, [inputs.share]);

  useEffect(() => {
    setLinkValidation(validateLinkInput(inputs.link));
  }, [inputs.link]);

  useEffect(() => {
    setTitleValidation(validateTitleInput(inputs.title));
  }, [inputs.title]);

  useEffect(() => {
    setDescriptionValidation(validateDescriptionInput(inputs.description));
  }, [inputs.description]);

  return (
    <FieldGroup className="max-w-sm gap-5">
      <Field className="gap-1">
        <FieldLabel htmlFor="block-start-input ">URL</FieldLabel>
        <InputGroup className="rounded-md border-2 focus:border-2 has-[[data-slot=input-group-control]:focus-visible]:border-yellow-600 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <InputGroupInput
            placeholder="https://example.com "
            value={inputs.link}
            onChange={(e) => inputs.setLink(e.target.value)}
          />
          <InputGroupAddon>
            <LinkIcon size={18} />
          </InputGroupAddon>
        </InputGroup>
        <InputValidationFeedback
          input={inputs.link}
          inputValidation={linkValidation}
          inputRules={CommonRule}
        />
      </Field>
      <Field className="gap-1">
        <FieldLabel htmlFor="block-start-input ">Title</FieldLabel>
        <InputGroup className="rounded-md border-2 has-[[data-slot=input-group-control]:focus-visible]:border-yellow-600 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <InputGroupInput
            placeholder="Title of content"
            value={inputs.title}
            onChange={(e) => inputs.setTitle(e.target.value)}
          />
          <InputGroupAddon>
            <KeyboardIcon size={18} />
          </InputGroupAddon>
        </InputGroup>
        <InputValidationFeedback
          input={inputs.title}
          inputValidation={titleValidation}
          inputRules={CommonRule}
        />
      </Field>

      <Field className="gap-1">
        <FieldLabel htmlFor="block-start-input ">Description</FieldLabel>
        <InputGroup className="rounded-md border-2 focus:border-2 has-[[data-slot=input-group-control]:focus-visible]:border-yellow-600 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <Textarea
            id="message"
            value={inputs.description}
            placeholder="Optional notes..."
            onChange={(e) => inputs.setDescription(e.target.value)}
          ></Textarea>
        </InputGroup>
        <InputValidationFeedback
          input={inputs.description}
          inputValidation={descriptionValidation}
          inputRules={CommonRule}
        />
      </Field>
      <Field className="gap-1">
        <FieldLabel htmlFor="block-start-input ">Tags</FieldLabel>
        <TagsInputComp tricks={inputs.tags} setTricks={inputs.setTags} />
      </Field>

      <div className="flex items-center justify-between">
        <div className="flex flex-2 gap-2">
          <label htmlFor="category" className="text-sm">
            Category
          </label>
          <select
            value={inputs.category}
            name="category"
            id="category"
            onChange={handleCategorySelection}
          >
            {filteredCategoryArray.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center gap-3 py-2">
          Make shareable
          <Checkbox
            checked={inputs.share}
            onClick={() => {
              inputs.setIsShareable(!inputs.share);
            }}
            className="inline-block border-black transition-all duration-200 ease-in dark:border-white"
          />
        </div>
      </div>
    </FieldGroup>
  );
}
