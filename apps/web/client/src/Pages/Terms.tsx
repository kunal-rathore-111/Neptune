import PrivacyTerms from "@/components/legal/PrivacyTerms";

export default function TermsofServicePage() {
  const TermsofServiceDataArray = [
    {
      title: "Acceptance",
      description:
        "By using 2nd Mind you agree to these terms. If you do not agree, please do not use the service.",
    },
    {
      title: "Your account",
      description:
        "You are responsible for maintaining the security of your account. You must not share your credentials or use 2nd Mind for any unlawful purpose.",
    },
    {
      title: "Your content",
      description:
        "You retain full ownership of the bookmarks and notes you save. By using 2nd Mind you grant us a limited license to store and display your content for the purpose of operating the service.",
    },
    {
      title: "Acceptable use",
      description:
        "You may not use 2nd Mind to store or distribute illegal content, to circumvent access controls, or to interfere with the service's infrastructure. Violations may result in immediate account termination.",
    },
    {
      title: "Free plan limits",
      description:
        "The free plan allows up to 500 bookmarks. Exceeding this limit will disable saving new bookmarks until you upgrade or remove existing ones. We will notify you before limits take effect.",
    },
    {
      title: "Service availability",
      description:
        "We aim for 99.9% uptime but do not guarantee it. Scheduled maintenance will be communicated in advance. We are not liable for data loss due to infrastructure failure — please export your bookmarks regularly.",
    },
    {
      title: "Termination",
      description:
        "We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time from Settings.",
    },
  ];

  return (
    <PrivacyTerms
      heading="Terms of Service"
      DataArray={TermsofServiceDataArray}
    />
  );
}
