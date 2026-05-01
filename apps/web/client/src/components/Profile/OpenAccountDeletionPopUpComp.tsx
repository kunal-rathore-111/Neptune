import { useAccountDeletion } from "@/hooks/react-query-hooks/useAccountDeletion";
import { LoaderIcon } from "@repo/icons";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldGroup,
  FieldTitle,
  Input,
  Label,
} from "@repo/ui";
import { validatePasswordInput } from "@repo/validation";
import { useEffect, useState, type FormEvent } from "react";
import { InputValidationFeedback } from "../sign/InputValidationFeedback";
import { PasswordRules } from "@/lib/constants/content/rules";

export function OpenAccountDeletionPopUp() {
  const { isPending, mutate: accountDeletionMutation } = useAccountDeletion();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordValidation, setPasswordValidation] = useState<any>("");

  useEffect(() => {
    setPasswordValidation(validatePasswordInput(password));
  }, [password]);

  function handleAccountDeleteForm(e: FormEvent) {
    e.preventDefault();
    accountDeletionMutation({ email, password });
  }
  return (
    <>
      {isPending ? (
        <div className="flex w-full items-center justify-center">
          {" "}
          <LoaderIcon />
        </div>
      ) : (
        <Dialog>
          <DialogTrigger className="hover: rounded-sm bg-black p-2 font-medium text-white hover:bg-zinc-700 dark:bg-zinc-200 dark:text-black dark:hover:bg-zinc-400">
            Delete Account
          </DialogTrigger>
          <DialogContent>
            <form
              onSubmit={(e) => handleAccountDeleteForm(e)}
              className="space-y-8"
            >
              <DialogHeader>
                <DialogTitle>Are you sure to delete the account?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <FieldTitle> Please verify your email and password</FieldTitle>
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="example@gmail.com"
                  />
                </Field>
                <Field>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {
                    <InputValidationFeedback
                      input={password}
                      inputRules={PasswordRules}
                      inputValidation={passwordValidation}
                    />
                  }
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">No</Button>
                </DialogClose>
                <Button type="submit">Yes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
