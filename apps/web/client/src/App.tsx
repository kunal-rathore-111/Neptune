import Layout from "./Layout";

export default function App() {
  return (
    <div className="flex w-full flex-col items-center text-zinc-700 dark:text-zinc-300">
      <div className="md:max-w-2xl lg:max-w-full">
        <Layout></Layout>
      </div>
    </div>
  );
}
