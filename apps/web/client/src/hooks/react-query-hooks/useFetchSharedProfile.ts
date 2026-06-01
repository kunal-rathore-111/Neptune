import { fetchSharedProfileService } from "@/services/fetchSharedProfileService";
import { useInfiniteQuery } from "@tanstack/react-query";


export function useFetchSharedProfile(hash: string, options = {}) {
    const result = useInfiniteQuery({
        queryKey: ['sharedProfileData', hash],
        queryFn: ({ pageParam }) => fetchSharedProfileService(pageParam, hash),
        initialPageParam: undefined as Date | undefined,
        getNextPageParam: (lastPage) => {
            if (!lastPage || lastPage.type === "error") return undefined;
            return lastPage.pagination.hasMoreContent ? lastPage.pagination.nextCursor : undefined;
        },
        ...options
    });
    return result;
}