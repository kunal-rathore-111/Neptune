import { GetStarted2Card } from "./GetStarted2Card";

export default function GetStarted2() {
  return (
    <>
      <div className="mt-0 flex flex-col">
        <h3 className="mb-14 flex w-full items-center justify-center gap-1 text-6xl font-semibold text-black/70 uppercase dark:text-white/60">
          What's stopping you my dear?
        </h3>
        <GetStarted2Card></GetStarted2Card>
      </div>
    </>
  );
}
