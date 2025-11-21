import { fetchRecentOrderForAdmin } from "@/api/TransactionApi";
import { RecentOrder } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query";

export const useRecentOrdersAdmin = (token: string) => {
    const { 
        data = [], 
        isLoading,
        isFetched, 
        isError, 
    } = useQuery<RecentOrder[]>({
        queryKey: ["recentOrders"],
        queryFn: () => fetchRecentOrderForAdmin(token),
        enabled: !!token,
        staleTime: 1000 * 60 * 5
    });

    return {
        recentOrders: data,
        isLoadingRecentOrders: isLoading,
        isFetchedRecentOrders: isFetched,
        isErrorRecentOrders: isError
    }
}