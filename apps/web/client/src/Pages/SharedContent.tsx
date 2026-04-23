import { LongCardOutlineComp } from "@/components/sharedContent/LongCardOutline";
import { HandleResponseUtil } from "@/lib/utils/handleResponseUtil";
import { fetchSharedCardDataService } from "@/services/fetchSharedCardData";
import type { SharedContentDataType } from "@/Types/sharedContent";
import { ThemeToggleButton, toast } from "@repo/ui";
import { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./Loading";
import { useParams } from "react-router";

export default function SharedContent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<SharedContentDataType>();
  const { content_share_hash } = useParams();

  useEffect(() => {
    async function fetchSharedCardData() {
      if (!content_share_hash) {
        toast.error("ContentId not found", { position: "top-right" });
        return;
      }
      setIsLoading(true);
      const response = await fetchSharedCardDataService(content_share_hash);
      setIsLoading(false);
      HandleResponseUtil(response, null, null);
      if (response.type === "success") setFetchedData(response.data);
    }

    fetchSharedCardData();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <main className="h-screen w-screen">
          {fetchedData ? (
            <LongCardOutlineComp
              ThemeButton={ThemeToggleButton}
              selectedCardData={fetchedData}
            />
          ) : (
            <ErrorPage />
          )}
        </main>
      )}
    </>
  );
}
