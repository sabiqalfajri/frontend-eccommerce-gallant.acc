import { fetchOverviewDashboard } from "@/api/OverviewDashboardApi";
import { useQuery } from "@tanstack/react-query"

export const useOverview = (token: string) => {
    const {
        data,
        isLoading,
        isFetched, 
    } = useQuery({
        queryKey: ["overview", token],
        queryFn: () => fetchOverviewDashboard(token),
        enabled: !!token,
        staleTime: 1000 * 60 * 5
    });

    return {
        overview: data,
        isLoadingOverview: isLoading,
        isFetchedOverview: isFetched
    }
}