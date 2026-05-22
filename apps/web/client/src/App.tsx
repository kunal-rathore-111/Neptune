import Layout from "./Layout";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { store } from "./store";
import { SplashScreenPage } from "./Pages/SplashScreen";
import { useEffect, useState } from "react";
export default function App() {
  const client = new QueryClient();
  const [showLayout, setShowLayout] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLayout(true);
    }, (1400));

    return () => clearTimeout(timer);

  }, []);
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <div className="flex w-full flex-col items-center text-zinc-700 dark:text-zinc-300">
            <div className="md:max-w-2xl lg:max-w-full">
              {showLayout ?
                <Layout></Layout>
                :
                <SplashScreenPage />}
            </div>
          </div>
        </QueryClientProvider>
      </Provider>
    </>
  );
}
