import { markAllNotificationsAsRead } from "@/api/NotificationApi";
import { NotificationListResponse } from "@/types/Notification";
import { showError } from "@/utils/Toast";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkAllAsRead = (token: string | null) => {
    const queryClient = useQueryClient();

    const markAllAsReadMutation = useMutation({
        mutationFn: async () => {
            if(!token) throw new Error("Unauthorized");
            return markAllNotificationsAsRead(token)
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["admin-notifications"] });

            const previousNotification = 
            queryClient.getQueryData<InfiniteData<NotificationListResponse>>(["admin-notifications"]);
            const previousUnreadCount =
            queryClient.getQueryData<{ count: number }>([
            "admin-unread-count",
            ]);

            queryClient.setQueryData<InfiniteData<NotificationListResponse>>(["admin-notifications"], (old) => {
                if(!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        notifications: page.notifications.map((notif) => ({
                            ...notif,
                            isRead: true
                        }))
                    }))
                }
            })

            queryClient.setQueryData(
                ["admin-unread-count"],
                { count: 0 }
            );

            return { 
                previousNotification,
                previousUnreadCount,
            }
        },
        onError: (_error, _vars, context) => {
            if(context?.previousNotification) {
                queryClient.setQueryData(["admin-notifications"], context.previousNotification)
            }

            if (context?.previousUnreadCount) {
                queryClient.setQueryData(
                ["admin-unread-count"],
                context.previousUnreadCount
                );
            }

            showError("Gagal menandai notifikasi sebagai dibaca");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ 
                queryKey: ["admin-notifications"] 
            });
            queryClient.invalidateQueries({
                queryKey: ["admin-unread-count"],
            });
        }
    })

    return {
        markAllAsRead: markAllAsReadMutation.mutateAsync,
    }
}