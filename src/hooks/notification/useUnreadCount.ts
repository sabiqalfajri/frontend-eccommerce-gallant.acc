import { fetchUnreadNotificationCount } from "@/api/NotificationApi";
import { useQuery } from "@tanstack/react-query";

export const useUnreadCount = (token: string | null) => {
    const {
        data, 
        isLoading,
        isFetched,
    } = useQuery({
        queryKey: ["admin-unread-count"],
        queryFn: async () => {
            if (!token) throw new Error("Unauthorized");
            return fetchUnreadNotificationCount(token);
        },
        enabled: !!token,
        staleTime: 30_000,
        refetchOnWindowFocus: true,
    });

    return {
        count: data?.count ?? 0,
        isLoadingCount: isLoading,
        isFetchedCount: isFetched
    }
}