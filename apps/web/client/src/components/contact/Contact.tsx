import { MailIcon, UserIcon } from "lucide-react";
import { FloatingLabelInput, Textarea, ThemeHomeComp } from "@repo/ui";
import { useState } from "react";
import { Link } from "react-router";

export default function ContactForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  return (
    <div className="flex max-w-100 flex-col rounded-2xl py-6 text-start shadow-lg shadow-zinc-500/40 dark:border-2">
      <div className="flex flex-col gap-7 px-8 py-3">
        <div className="flex flex-col gap-2">
          <ThemeHomeComp />
          <div className="flex flex-col gap-6">
            <h1 className="text-center text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Contact support
            </h1>
            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                Get in touch with our support staff to get answers to your
                burning questions!
              </p>
              <p>
                By submitting a ticket, you agree to adhere to our{" "}
                <Link
                  to={"/terms-of-engaement"}
                  className="font-medium text-zinc-900 underline decoration-zinc-400 dark:text-zinc-200 dark:decoration-zinc-500"
                >
                  Terms of Engagement.
                </Link>
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-4">
          {/* name */}
          <div className="space-y-2">
            <FloatingLabelInput
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              icon={<UserIcon />}
            />
          </div>

          {/* Email  */}
          <div className="space-y-2">
            <FloatingLabelInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              icon={<MailIcon />}
            />
          </div>

          {/* How can we help?  */}
          <div className="space-y-2">
            <Textarea
              id="message"
              value={message}
              placeholder="How can we help?"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 mt-2 inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
