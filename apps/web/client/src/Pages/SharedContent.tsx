import { LongCardOutlineComp } from "@/components/sharedContent/LongCardOutline";
import { ThemeToggleButton } from "@repo/ui";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./Loading";
import { useParams } from "react-router";
import { useFetchSharedBookmark } from "@/hooks/react-query-hooks/useFetchSharedBookmark";
import { ErrorComp } from "@/components/ErrorComp";

export default function SharedContent() {
  const { content_share_hash } = useParams();
  const {
    data: response,
    isLoading,
    error,
  } = useFetchSharedBookmark(content_share_hash);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <main className="h-screen w-screen">
          {error ? (
            <div>
              <ErrorComp message={error.message} />
            </div>
          ) : response?.data ? (
            <LongCardOutlineComp
              ThemeButton={ThemeToggleButton}
              selectedCardData={response.data}
            />
          ) : (
            <ErrorPage />
          )}
        </main>
      )}
    </>
  );
}
