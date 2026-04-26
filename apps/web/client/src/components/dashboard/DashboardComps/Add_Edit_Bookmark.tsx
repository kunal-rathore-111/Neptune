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
import { Field, FieldGroup, FieldLabel, toast } from "@repo/ui";
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
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { useAdd_EditBookmark } from "@/hooks/react-query-hooks/useAdd_EditBookmark";

interface AddBookMarkCardDTO {
  setOpenAdd_Edit_Card: Dispatch<SetStateAction<boolean>>;
  presentData?: dashboardFetchDataType;
}

export function Add_Edit_BookMarkCard({
  setOpenAdd_Edit_Card,
  presentData,
}: AddBookMarkCardDTO) {
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [share, setIsShareable] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("Others");

  useEffect(() => {
    if (presentData) {
      setDescription(presentData.contentTable.description || "");
      setLink(presentData.contentTable.link || "");
      setTitle(presentData.contentTable.title);
      setTags(presentData.contentTable.tags || []);
      setIsShareable(
        presentData.ContentShareLinkTable?.contentSharehash ? true : false,
      );
      setCategory(presentData.contentTable.category || "Others");
    }
    // eslint-disable-next-line
  }, [presentData]);

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

  const { mutate: add_edit_MutateFn, isPending: add_edit_isPending } =
    useAdd_EditBookmark();
  async function handleAdd_Edit_BookMarkFormSubmit(e: FormEvent) {
    e.preventDefault();

    let data: addBookmarkDataType | editBookmarkDataType = {
      description,
      link,
      title,
      tags,
      share,
      category,
    };
    if (presentData) {
      data = { ...data, id: presentData.contentTable.id };
    }
    // full data validation-  description, link, title, tags, share, category
    const result = contentZodSchema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.issues[0].message, { position: "top-right" });
    } else {
      const type = presentData ? "edit" : "add";

      /*  service call */
      await add_edit_MutateFn({ data, type });
    }
  }

  /*  useffect to stop background scroll the body (same code was also in the longCardComp) */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  return (
    <>
      <div className="fixed inset-0 z-10 flex max-h-screen items-center justify-center bg-black/30 backdrop-blur-xs">
        <div className="relative flex h-full max-h-[90vh] w-150 flex-col rounded-xl border bg-zinc-100 p-7 text-start text-xs shadow-sm shadow-zinc-900 dark:bg-zinc-950/80 dark:shadow-zinc-300/90">
          <span className="absolute -top-2 -right-2 z-20 rounded-full border-2 bg-zinc-300 p-0.5">
            {
              <XIcon
                onClick={() => {
                  setOpenAdd_Edit_Card(false);
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
                    <h5 className="text-sm">Add Bookmark</h5>
                  </div>
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

  useEffect(() => {}, [inputs.share]);

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
            name="category"
            id="category"
            onChange={handleCategorySelection}
          >
            {filteredCategoryArray.map((category) => {
              return <option value={category}>{category}</option>;
            })}
          </select>
        </div>
        <div className="flex items-center gap-3 py-2">
          Make shareable
          <Checkbox
            checked={inputs.share}
            onClick={() => {
              console.error(inputs.share);
              inputs.setIsShareable(!inputs.share);
            }}
            className="inline-block border-black transition-all duration-200 ease-in dark:border-white"
          />
        </div>
      </div>
    </FieldGroup>
  );
}
