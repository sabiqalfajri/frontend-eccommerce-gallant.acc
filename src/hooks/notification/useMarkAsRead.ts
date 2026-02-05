import { markNotificationAsRead } from "@/api/NotificationApi";
import { NotificationListResponse } from "@/types/Notification";
import { showError } from "@/utils/Toast";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkAsRead = (token: string | null) => {
    const queryClient = useQueryClient();

    const markAsReadMutation = useMutation({
        mutationFn: async (id: string) => {
            if(!token) throw new Error("Unauthorized");
            return markNotificationAsRead(token, id)
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["admin-notifications"] });
            const previousNotification = 
            queryClient.getQueryData<InfiniteData<NotificationListResponse>>(["admin-notifications"]);

            queryClient.setQueryData<InfiniteData<NotificationListResponse>>(["admin-notifications"], (old) => {
                if(!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        notifications: page.notifications.map((notif) =>
                            notif.id === id
                                ? { ...notif, isRead: true }
                                : notif
                        ),
                    }))
                }
            })

            return { previousNotification }
        },
        onError: (_error, _id, context) => {
            if(context?.previousNotification) {
                queryClient.setQueryData(["admin-notifications"], context.previousNotification)
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
        markAsRead: markAsReadMutation.mutateAsync,
    }
}