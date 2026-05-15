import { fetchEOQConfig } from "@/api/EOQApi"
import { EOQConfig } from "@/types/EOQ"
import { useQuery } from "@tanstack/react-query"

export const useEOQConfig = (
    token: string
) => {
    const {
        data,
        isPending,
        isFetching,
        isFetched,
        error
    } = useQuery<EOQConfig>({
        queryKey: ["eoqConfig"],
        queryFn: () => fetchEOQConfig(token),
        enabled: !!token,
        staleTime: 1000 * 60 * 10
    });

    return {
        config: data,
        isPendingConfig: isPending,
        isFetching,
        isFetched,
        error
    }
}