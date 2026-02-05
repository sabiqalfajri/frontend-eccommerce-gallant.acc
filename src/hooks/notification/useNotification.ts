import { fetchAdminNotifications } from "@/api/NotificationApi";
import { Cursor, FetchAdminNotificationsPayload, Notification, NotificationListResponse } from "@/types/Notification";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

interface UseNotificationResult {
    notifications: Notification[];
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    isFetching: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean | undefined;
    fetchNextPage: () => void;
    refetch: () => void;
}

export const useNotification = (token: string | null): UseNotificationResult => {
    const { 
        data, 
        isLoading,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch,
        isError, 
        error 
    } = useInfiniteQuery<
        NotificationListResponse,
        Error,
        InfiniteData<NotificationListResponse>,
        string[],
        Cursor | undefined
    >({
        queryKey: ["admin-notifications"],
        queryFn: async ({ pageParam }) => {
            if(!token) throw new Error("Unauthorized");

            const payload: FetchAdminNotificationsPayload = {
                token,
                limit: 20,
                cursor: pageParam
            };

            return fetchAdminNotifications(payload);
        },
        initialPageParam: undefined as Cursor | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        enabled: !!token,
        staleTime: 3 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 2,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    })

    const notifications = data?.pages.flatMap(page => page.notifications) ?? []

    return {
        notifications,
        isLoading,
        isError,
        error,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage: async () => await fetchNextPage(),
        refetch: async () => await refetch(),
    }
}