import { BookTextIcon } from "@repo/icons";
import { footerLinks, socialLinks } from "@/lib/constants/content/Footer";
import { Link } from "react-router";
export const Footer = () => {
  return (
    <footer className="mt-0 border-t px-4">
      <div className="">
        <div className="grid grid-cols-2 py-8 max-sm:mx-auto max-sm:max-w-sm md:grid-cols-5">
          <div className="col-span-full mb-10 flex w-full flex-col items-center md:col-span-3 md:mb-0 md:items-start">
            <div className="flex items-center gap-1">
              <BookTextIcon size={22} className="inline-block" />
              <span className="font-semibold">2nd Mind</span>
            </div>
            <p className="max-w-55 py-4 text-sm wrap-break-word text-black/40 md:text-start lg:mx-0 lg:text-left dark:text-zinc-300/40">
              A premium bookmark manager for people who think in links.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((x, idx) => {
                return (
                  <Link
                    key={idx}
                    aria-label={x.label}
                    to={x.href}
                    className="flex items-center justify-center rounded-sm border border-zinc-200 bg-zinc-100 p-1 text-zinc-600 shadow-[0_1px_0_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-102 hover:border-zinc-300 hover:text-zinc-900 hover:shadow-[0_3px_0_rgba(0,0,0,0.18)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  >
                    <x.icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <div className="flex w-full flex-col items-center" key={idx}>
              <div key={title} className="items-center text-left lg:mx-auto">
                <h4 className="mb-3 text-sm font-medium text-gray-900 uppercase dark:text-white">
                  {title}
                </h4>
                <ul className="text-sm transition-all duration-500">
                  {links.map((link, index) => (
                    <li
                      key={index}
                      className={index === links.length - 1 ? "" : "mb-5"}
                    >
                      <Link
                        to={link.to}
                        className="text-black/70 hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4 text-sm">
        <div className="mx-auto lg:max-w-7xl">
          <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
            <span className="text-center text-gray-500 dark:text-gray-400">
              ©{" "}
              <Link
                to="#"
                className="hover:text-red-500 dark:hover:text-indigo-400"
              >
                2026 2nd Mind.
              </Link>{" "}
              All rights reserved.
            </span>
            <div className="flex gap-5">
              <Link
                to={"/privacy-policy"}
                className="text-black/70 hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
              >
                Privacy
              </Link>
              <Link
                to={"/terms"}
                className="text-black/70 hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
