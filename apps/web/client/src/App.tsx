import Layout from "./Layout";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { store } from "./store";
export default function App() {
  const client = new QueryClient();
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <div className="flex w-full flex-col items-center text-zinc-700 dark:text-zinc-300">
            <div className="md:max-w-2xl lg:max-w-full">
              <Layout></Layout>
            </div>
          </div>
        </QueryClientProvider>
      </Provider>
    </>
  );
}
