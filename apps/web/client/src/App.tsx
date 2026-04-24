import Layout from "./Layout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export default function App() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <div className="flex w-full flex-col items-center text-zinc-700 dark:text-zinc-300">
          <div className="md:max-w-2xl lg:max-w-full">
            <Layout></Layout>
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
}
