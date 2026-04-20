import { LoaderIcon } from "@repo/icons";

export default function LoadingPage() {
  return (
    <div className="relative flex min-h-screen min-w-screen flex-col items-center justify-center bg-white dark:bg-black">
      <LoaderIcon />
    </div>
  );
}
