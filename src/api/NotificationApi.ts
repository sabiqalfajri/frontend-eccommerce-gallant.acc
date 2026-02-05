import { FetchAdminNotificationsPayload, NotificationListResponse, UnreadNotificationCountResponse } from "@/types/Notification";
import { axiosClient } from "./AxiosClient"
import { ApiResponse } from "@/types/ApiResponse";

export const fetchAdminNotifications = async ({
    token,
    limit,
    cursor
}: FetchAdminNotificationsPayload) => {
    const response = await axiosClient.get<ApiResponse<NotificationListResponse>>('/notifications/admin', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            limit,
            cursorId: cursor?.id,
            cursorCreatedAt: cursor?.createdAt
        }
    });

    return response.data.data
}

export const fetchUnreadNotificationCount = async (token: string) => {
    const response = await axiosClient.get<ApiResponse<UnreadNotificationCountResponse>>('/notifications/admin/unread-count', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}

export const markNotificationAsRead = async (token: string, id: string) => {
    const response = await axiosClient.patch<ApiResponse<Record<string, never>>>(`/notifications/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.message
}

export const markAllNotificationsAsRead = async (token: string) => {
    const response = await axiosClient.patch<ApiResponse<Record<string, never>>>('/notifications/admin/read-all', 
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.message
}