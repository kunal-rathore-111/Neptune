import Layout from "./Layout";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { store } from "./store";
import { Toaster, TooltipProvider } from "@repo/ui";

const client = new QueryClient();


export default function App() {



  return (
    <>
      <Provider store={store}>

        <TooltipProvider>

          <QueryClientProvider client={client}>

            <div className="flex w-full flex-col items-center text-zinc-700 dark:text-zinc-300">
              <div className="w-full md:max-w-2xl lg:max-w-full">
                <Layout></Layout>
              </div>
            </div>

          </QueryClientProvider>

        </TooltipProvider>

        <Toaster position="top-center" />

      </Provider>
    </>
  );
}
