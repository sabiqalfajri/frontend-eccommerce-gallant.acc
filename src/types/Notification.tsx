type NotificationType = 
    'ORDER_CREATED' |
    'PAYMENT_RECEIVED' |
    'PAYMENT_FAILED' |
    'ORDER_ACTION_REQUIRED' | 
    'STOCK_LOW'

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    isRead: boolean;
    referenceId: string;
    referenceType: string;
    uniqueKey: string;
    createdAt: string; 
}

export interface NotificationListResponse {
    notifications: Notification[];
    nextCursor: Cursor | undefined;
    hasNextPage: boolean;
}

export interface UnreadNotificationCountResponse {
    count: number;
}

export type Cursor = {
    id: string
    createdAt: string
}

export interface FetchAdminNotificationsPayload {
    token: string;
    limit?: number;
    cursor?: Cursor;
}