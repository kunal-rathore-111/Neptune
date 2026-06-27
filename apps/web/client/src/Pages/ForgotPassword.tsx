import type { ActionState } from "@/lib/types";
import { otpService } from "@/services/otpService";
import { validateOtpService } from "@/services/validateOtpService";
import { LoaderIcon } from "@repo/icons";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Field, FieldGroup, FieldLabel, Input, ThemeHomeComp, toast } from "@repo/ui";
import { otpZod } from "@repo/validation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";



export default function ForgotPasswordComp() {

    const [searchParam] = useSearchParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [showUpdateEmailButton, setShowUpdateEmailButton] = useState<boolean>(false);

    const [OTP, setOTP] = useState<string>('');
    const [showOTPInput, setShowOTPInput] = useState<boolean>(false);

    const [isResending, startTransition] = useTransition();




    /*FUNCTIONS */

    const resendOTP = async () => {

        const response = await otpService(email, "forgotPassword");
        if (response.error) {
            toast.error(response.error);
            return;
        }
        else {
            toast(response.message);
            setOTP("");
            return;
        }
    }


    const [state, formAction, isPending] = useActionState<ActionState, FormData>(handleSubmit, null);

    async function handleSubmit(_prevState: any, formData: FormData) {

        if (!email) {
            return { error: "Email input is empty." };
        }

        else if (!showOTPInput) {
            // send OTP function call here
            return await otpService(email, 'forgotPassword');
        }
        else { // if above all fails means validate OTP and redirect to update password form
            const ZodOTPResult = otpZod.safeParse({ otp: OTP });

            if (!ZodOTPResult.success) { // need to update with zod validation
                return { error: ZodOTPResult.error.issues[0].message };
            }
            else {
                // make backend call to check OTP
                formData.append('type', 'forgotPassword');
                return await validateOtpService(formData);
            }
        }

    }



    /* effects */
    useEffect(() => {
        if (searchParam.get('error')) {
            toast.error(searchParam.get('error'));
            navigate('.', { replace: true });
        }
    }, [])

    useEffect(() => {
        if (state?.error) {
            toast.error(state.error);
        }
        if (state?.message) {
            toast(state.message);
            setShowOTPInput(true);
            setShowUpdateEmailButton(true);
        }
        if (state?.redirectURL) {
            navigate(state.redirectURL);
        }
    }, [state])




    return (
        <section className="h-screen w-screen pb-40 dark:bg-black bg-white  lg:py-20  sm:py-16 py-8 relative flex items-center justify-center">
            <Card className="px-6 py-4 sm:px-12 sm:py-8 relative gap-6  w-sm shadow-md dark:shadow-white  shadow-black" >

                <CardHeader className="text-center gap-6 p-0">
                    <ThemeHomeComp />

                    <div className="flex flex-col gap-1">
                        <CardTitle className="text-2xl font-medium ">
                            Forgot your password?
                        </CardTitle>
                        <CardDescription className="text-sm font-normal ">
                            Please enter the email address associated with your account and
                            we will email you an OTP to reset your password.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-0">

                    <fieldset disabled={isPending || isResending}>

                        <form action={formAction}>
                            <FieldGroup className="gap-6">
                                <div className="flex flex-col gap-4">
                                    <Field className="gap-1.5">
                                        <FieldLabel
                                            htmlFor="email"
                                            className="text-sm text-muted-foreground font-normal
                      justify-between"
                                        >
                                            Email*
                                            {
                                                showUpdateEmailButton
                                                &&
                                                <Button
                                                    variant={"link"}
                                                    onClick={() => {
                                                        setShowOTPInput(false);
                                                        setOTP("");
                                                        setShowUpdateEmailButton(false);
                                                    }}
                                                >
                                                    Update Email
                                                </Button>
                                            }
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            readOnly={showOTPInput}
                                            placeholder="example@gmail.com"
                                            required
                                            className=" h-9"
                                        />
                                    </Field>
                                </div>


                                {/* OTP block */}
                                {
                                    showOTPInput &&
                                    <FieldGroup className="gap-6">
                                        <div className="flex flex-col gap-4">
                                            <Field className="gap-1.5">
                                                <FieldLabel
                                                    htmlFor="OTP"
                                                    className="text-sm text-muted-foreground font-normal justify-between"
                                                >
                                                    OTP*
                                                    {
                                                        showUpdateEmailButton
                                                        &&
                                                        <Button
                                                            variant={"link"}
                                                            type="button"
                                                            onClick={() => {
                                                                startTransition(async () => await resendOTP())
                                                            }}
                                                        >
                                                            Resend OTP
                                                        </Button>
                                                    }
                                                </FieldLabel>

                                                <Input
                                                    placeholder="Enter your OTP"
                                                    value={OTP}
                                                    name="otp"
                                                    type="text"
                                                    maxLength={6}
                                                    minLength={6}
                                                    required
                                                    onChange={(e) => setOTP(e.target.value)}
                                                />
                                            </Field>
                                        </div>
                                    </FieldGroup>
                                }

                                <Field className="gap-4">

                                    {
                                        isPending || isResending ?
                                            <Button size={"lg"} className="rounded-xl h-10 border-white dark:border-black"
                                            >
                                                <LoaderIcon />
                                            </Button>
                                            :
                                            showOTPInput ?
                                                <Button type="submit" size={"lg"} className="rounded-xl h-10 cursor-pointer hover:bg-zinc-200 hover:text-black dark:hover:bg-black dark:hover:text-white"
                                                >
                                                    Submit
                                                </Button>
                                                :
                                                <Button type="submit" size={"lg"} className="hover:bg-zinc-200 hover:text-black rounded-xl h-10 cursor-pointer dark:hover:bg-black dark:hover:text-white "
                                                >
                                                    Send OTP
                                                </Button>

                                    }
                                    <Link
                                        to={'/sign-in'}
                                        className="bg-black hover:bg-black/82 dark:bg-white dark:text-black rounded-xl dark:hover:bg-white/80 text-white p-2 cursor-pointer text-center "
                                    >
                                        Back to Login
                                    </Link>
                                </Field>
                            </FieldGroup>
                        </form>
                    </fieldset>
                </CardContent>
            </Card>
        </section >
    );
};


