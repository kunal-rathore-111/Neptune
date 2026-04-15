import PrivacyTerms from "@/components/legal/PrivacyTerms";

export default function PrivacyPolicyPage() {
  const PrivacyDataArray = [
    {
      title: "What we collect",
      description:
        "2nd Mind collects only the information you explicitly provide: your email address when you create an account, and the bookmarks (URLs, titles, tags) you save. We do not collect browsing history beyond what you actively save.",
    },
    {
      title: "How we use your information",
      description:
        "We use your information to create and secure your account, save and organize your bookmarks, sync your data across sessions, and provide core product functionality.",
    },
    {
      title: "Legal basis and consent",
      description:
        "By creating an account and using 2nd Mind, you consent to the processing of your data as described in this policy. You may request deletion of your data at any time.",
    },
    {
      title: "Data storage and retention",
      description:
        "Your bookmarks and account data are stored only as long as needed to operate your account. If you delete content or close your account, we remove associated data within a reasonable period, subject to legal obligations.",
    },
    {
      title: "Data sharing",
      description:
        "We do not sell your personal data. We may share limited data with trusted infrastructure providers strictly to host, secure, and operate 2nd Mind.",
    },
    {
      title: "Security",
      description:
        "We apply reasonable technical and organizational safeguards to protect your data. However, no internet service is completely secure, and we cannot guarantee absolute security.",
    },
    {
      title: "Your rights",
      description:
        "You can access, update, export, or delete your data through account settings (where available) or by contacting us. You may also request account deletion at any time.",
    },
    {
      title: "Policy updates",
      description:
        "We may update this Privacy Policy to reflect legal, technical, or product changes. When we make material changes, we will update the effective date and provide notice where appropriate.",
    },
  ];

  return <PrivacyTerms heading="Privacy Policy" DataArray={PrivacyDataArray} />;
}
