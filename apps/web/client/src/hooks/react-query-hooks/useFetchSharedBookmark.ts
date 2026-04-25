import { fetchSharedCardDataService } from "@/services/fetchSharedCardData";
import { useQuery } from "@tanstack/react-query";

export function useFetchSharedBookmark(content_share_hash: string | undefined) {
  const result = useQuery({
    queryKey: ["sharedBookmark", content_share_hash],
    queryFn: async () => {
      if (!content_share_hash) {
        throw new Error("Content hash not found");
      }
      const response = await fetchSharedCardDataService(content_share_hash);

      if (response.type === "error") throw new Error(response.message);
      return response;
    },
  });
  return result;
}
