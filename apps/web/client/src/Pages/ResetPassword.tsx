import type { ActionState } from "@/lib/types";
import { resetPasswordService } from "@/services/resetPasswordService";
import { Button, Card, CardContent, CardHeader, CardTitle, Field, FieldGroup, FieldLabel, HomeButton, Input, ThemeToggleButton, toast } from "@repo/ui";
import { validatePasswordInput } from "@repo/validation";
import { useActionState, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";



export function ResetPassword() {

    const [state, formAction, isPending] = useActionState<ActionState, FormData>(handleSubmit, null);

    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const [searchParam] = useSearchParams();

    const email = searchParam.get('email');

    const navigate = useNavigate();

    /* functions */
    async function handleSubmit(_prevState: any, formData: FormData) {
        // validate password using zod then compare both passwords
        const validatePassword = validatePasswordInput(password);
        if (!validatePassword.success) {
            return { error: validatePassword.error.issues[0].message }
        }

        // then match both
        if (password !== password2) {
            return { error: "Both password did not matched." };

        }

        // then callbackend
        else {
            return await resetPasswordService(formData);
        }
    }


    useEffect(() => {
        if (state?.error) {
            toast.error(state.error);
        }
        if (state?.message) {
            toast.success(state.message);
            navigate('/sign-in', { replace: true })
        }
    }, [state]);


    if (!email) {
        navigate('/sign-in?error=Email not found.');
        return;
    }


    return (
        <div className="h-screen w-screen bg-black/90 dark:bg-white
     overflow-hidden lg:py-20 sm:py-16 py-8 relative flex items-center justify-center">
            <div className="py-8 md:py-20 max-w-sm md:max-w-lg px-4 md:px-4 mx-auto w-full">
                <Card className="px-6 py-4 sm:p-12 relative gap-8 shadow-xs dark:shadow-md 
dark:shadow-black shadow-white ">
                    <CardHeader className="text-center gap-4 p-0">
                        <div className="flex gap-2 justify-between w-full items-center">
                            <Link to="/">
                                <HomeButton />
                            </Link>
                            <CardTitle className="text-2xl font-medium text-card-foreground">
                                Set a new password
                            </CardTitle>
                            <ThemeToggleButton />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">

                        <fieldset disabled={isPending}>
                            <form action={formAction}>
                                <FieldGroup className="gap-4">

                                    <div className="flex flex-col ">
                                        <Field className="gap-1">
                                            <FieldLabel
                                                htmlFor="email"
                                                className="text-sm text-muted-foreground font-normal"
                                            >
                                                Email
                                            </FieldLabel>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={email}
                                                readOnly
                                                className="dark:bg-background h-9 opacity-70 cursor-not-allowed"
                                            />
                                        </Field>
                                    </div>

                                    <div className="space-y-4">
                                        <Field className="gap-1">
                                            <FieldLabel
                                                htmlFor="password"
                                                className="text-sm text-muted-foreground font-normal"
                                            >
                                                Password
                                            </FieldLabel>

                                            <Input
                                                name={'password'}
                                                id="password"
                                                value={password}
                                                type="text"
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                            />
                                        </Field>

                                        <Field className="gap-1">
                                            <FieldLabel
                                                htmlFor="password2"
                                                className="text-sm text-muted-foreground font-normal"
                                            >
                                                Confirm Password
                                            </FieldLabel>
                                            <Input
                                                id="password2"
                                                value={password2}
                                                type="text"
                                                placeholder="Re-enter the password"
                                                name={'password2'}
                                                onChange={(e) => setPassword2(e.target.value)} />
                                        </Field>
                                    </div>


                                    <Field className="gap-4">
                                        <Button type="submit" size={"lg"} className="rounded-xl h-10 cursor-pointer hover:bg-black/82 dark:hover:bg-white/80 dark:bg-white ">
                                            Reset Password
                                        </Button>
                                    </Field>

                                </FieldGroup>
                            </form>
                        </fieldset>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
