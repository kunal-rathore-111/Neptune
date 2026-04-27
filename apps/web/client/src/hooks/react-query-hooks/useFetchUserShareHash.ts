import { fetchUserShareHash } from "@/services/fetchUserShareHash";
import { useQuery } from "@tanstack/react-query";

export function useFetchUserShareHash() {
  const result = useQuery({
    queryKey: ["userShareHash"],
    queryFn: async () => {
      const response = await fetchUserShareHash();
      if (response.type === "error") {
        console.error(response.message);
        throw new Error(response.message);
      }
      return response;
    },
  });
  return result;
}
