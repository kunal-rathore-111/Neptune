import { GithubIcon } from "@repo/icons";

import { HelpCircle, MailIcon } from "lucide-react";
import {
  FeaturesArray,
  StepsArray,
  TipsArray,
} from "@/lib/constants/content/docs";
import { FeaturesCard } from "@/components/Docs/FeaturesCard";
import { StepsCard } from "@/components/Docs/StepsCard";
import {
  DotComp,
  ThemeHomeComp,
  Button,
  BackToHome_MoveUpComp,
} from "@repo/ui";
import { EmailLink, GithubRepoUrl } from "@/api/urls";

export default function Docs() {
  return (
    <main className="my-14 flex w-full flex-col items-start gap-5 rounded-2xl border px-14 py-10 text-start shadow-sm shadow-black dark:border-zinc-400 dark:shadow-zinc-200/70">
      <div className="border-b-2 py-8 lg:w-230">
        <div className="flex flex-col gap-10">
          {/*What is 2nd Mind?  */}
          <section className="space-y-5">
            <div className="flex w-full justify-between">
              <div className="flex w-fit items-center gap-1 rounded-sm border border-zinc-500 bg-zinc-200 px-2 text-xs text-zinc-600">
                <DotComp /> Documentation
              </div>
              <div className="flex items-end md:w-1/7 lg:w-1/12">
                <ThemeHomeComp />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl">What is 2nd Mind?</h1>
              <p>
                2nd Mind is a premium bookmark manager designed for knowledge
                workers who save hundreds of links. Powered by instant search,
                smart tags, and category-based organisation — so you never lose
                track of what matters.
              </p>
            </div>
          </section>

          {/* Getting Started */}
          <section className="w-full">
            <div className="space-y-2">
              <h2 className="font-semibold"> Getting Started </h2>
              <p>Follow these steps to start building your bookmark library:</p>
            </div>
            <div className="my-6 grid grid-cols-2 gap-4">
              {StepsArray.map((data, idx) => {
                return <StepsCard idx={idx} data={data} />;
              })}
            </div>
          </section>

          {/* core features */}
          <section className="w-full">
            <h2 className="font-semibold"> Core Features</h2>
            <div className="my-6 flex w-full flex-col gap-6">
              {FeaturesArray.map((data, idx) => {
                return <FeaturesCard data={data} idx={idx} />;
              })}
            </div>
          </section>
          {/* Tips */}
          <div className="flex flex-col gap-2">
            <h2 className="font-medium">Quick Tips</h2>
            <ul className="text-sm leading-6">
              {TipsArray.map((x, idx) => {
                return (
                  <li key={idx} className="text-zinc-500">
                    - {x.text}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Support Section */}
          <div className="flex flex-col gap-2 text-sm">
            <h2 className="text-lg">Support</h2>
            <p className="">Need help? We're here for you.</p>
            <div className="my-1 flex gap-3">
              {/* need to implement links need to decide wheter the .env or what to use for that */}
              {[
                { title: "Email support", icon: MailIcon, link: EmailLink },
                {
                  title: "View on Github",
                  icon: GithubIcon,
                  link: `${GithubRepoUrl}/issues`,
                },
                { title: "Contact us", icon: HelpCircle, link: "/contact" },
              ].map((x, idx) => {
                return (
                  <Button
                    asChild
                    className="border-3 border-zinc-300 bg-zinc-800 transition-all duration-300 hover:scale-105 hover:bg-black dark:border-zinc-600 dark:bg-zinc-200 hover:dark:bg-zinc-100"
                    key={idx}
                  >
                    <a
                      className="flex items-center gap-2 rounded border px-2 py-1 text-xs"
                      referrerPolicy="no-referrer"
                      target="_blank"
                      href={x.link}
                    >
                      <x.icon size={16} /> {x.title}
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <BackToHome_MoveUpComp />
    </main>
  );
}
