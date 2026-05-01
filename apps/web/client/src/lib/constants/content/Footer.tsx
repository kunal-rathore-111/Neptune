import { GithubIcon } from "@repo/icons";
import { TwitterIcon } from "@repo/icons";
import { MailCheckIcon } from "@repo/icons";
import {
  EmailLink,
  GithubRepo,
  Twitter,
} from "@/lib/utils/SocialLinks_PolicyDate";
export const footerLinks = {
  Products: [
    { name: "Try for free", to: "/sign-up" },
    { name: "Blog", to: "#" },
    { name: "Docs", to: "/docs" },
  ],
  Company: [
    { name: "Privacy Policy", to: "/privacy-policy" },
    { name: "Terms of Service", to: "/terms" },
    { name: "Contact Us", to: "/contact" },
  ],
};

export const socialLinks = [
  {
    label: "Github",
    icon: GithubIcon,
    href: GithubRepo,
  },
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: Twitter,
  },
  {
    label: "Email",
    icon: MailCheckIcon,
    href: EmailLink,
  },
];
