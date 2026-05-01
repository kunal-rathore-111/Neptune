import { Button, FloatingLabelInput } from "@repo/ui";
import {
  Eye,
  EyeClosed,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  LockKeyhole,
  Mail,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { InputValidationFeedback } from "../sign/InputValidationFeedback";
import { validatePasswordInput } from "@repo/validation";
import { PasswordRules } from "@/lib/constants/content/rules";
import { useUpdatePassword } from "@/hooks/react-query-hooks/useUpdatePassword";

type UpdatePasswordInputType = {
  setOpenUpdatePasswordComp: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UpdatePasswordComp(props: UpdatePasswordInputType) {
  const [email, setEmail] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [oldPasswordValidation, setOldPasswordValidation] = useState<any>();
  const [newPasswordValidation, setNewPasswordValidation] = useState<any>();
  const [confirmNewPasswordValidation, setConfirmNewPasswordValidation] =
    useState<any>();

  useEffect(() => {
    setOldPasswordValidation(validatePasswordInput(oldPassword));
  }, [oldPassword]);

  useEffect(() => {
    setNewPasswordValidation(validatePasswordInput(newPassword));
  }, [newPassword]);
  useEffect(() => {
    setConfirmNewPasswordValidation(validatePasswordInput(confirmNewPassword));
  }, [confirmNewPassword]);

  const { isPending, mutate: UpdatePasswordMutate } = useUpdatePassword();

  function handleUpdatePassword(e: FormEvent) {
    e.preventDefault();
    // test all inputs if  valid then process else toast

    UpdatePasswordMutate(
      { email, password: oldPassword, newPassword },
      {
        onSuccess: () => {
          props.setOpenUpdatePasswordComp(false);
        },
      },
    );
  }
  return (
    <div className="fixed inset-0 z-10 flex max-h-screen items-center justify-center bg-black/30 backdrop-blur-xs">
      <div className="relative flex h-fit max-h-[90vh] min-h-50 max-w-200 min-w-90 flex-col rounded-xl border bg-zinc-100 p-7 text-start text-xs shadow-sm shadow-zinc-900 dark:border-4 dark:bg-[#100A10] dark:shadow-zinc-300/90">
        <form className="space-y-6 overflow-auto p-8">
          <fieldset disabled={isPending}>
            <span className="absolute -top-2 -right-2 z-10 rounded-full border-2 bg-zinc-300 p-0.5">
              <X
                onClick={() => {
                  props.setOpenUpdatePasswordComp(false);
                }}
                className="text-zinc-900"
                size={18}
              />
            </span>
            <div className="flex flex-col space-y-10">
              <h1 className="text-2xl">Update Password</h1>

              <div className="space-y-5">
                <FloatingLabelInput
                  id="email"
                  type={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Plese enter your email"
                  icon={<Mail size={18} />}
                />

                {/*  password inputs */}
                <FloatingLabelInput
                  id="password"
                  type={showOldPassword ? "text" : "password"}
                  rightIcon={
                    showOldPassword ? (
                      <EyeIcon size={18} />
                    ) : (
                      <EyeOffIcon size={18} />
                    )
                  }
                  onRightIconClick={() => setShowOldPassword(!showOldPassword)}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Plese enter old Password"
                  icon={<LockIcon size={18} />}
                />
                <InputValidationFeedback
                  input={oldPassword}
                  inputValidation={oldPasswordValidation}
                  inputRules={PasswordRules}
                />

                <FloatingLabelInput
                  id="newPassword"
                  type={"password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Please enter new Password"
                  icon={<LockKeyhole size={18} />}
                />
                <InputValidationFeedback
                  input={newPassword}
                  inputValidation={newPasswordValidation}
                  inputRules={PasswordRules}
                />
                <FloatingLabelInput
                  id="confirmNewPassword"
                  type={"password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Please confirm new Password"
                  icon={<LockKeyhole size={18} />}
                />
                <InputValidationFeedback
                  input={confirmNewPassword}
                  inputValidation={confirmNewPasswordValidation}
                  inputRules={PasswordRules}
                />
              </div>
              <Button
                onClick={(e) => {
                  handleUpdatePassword(e);
                }}
                variant={"outline"}
              >
                Submit
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
