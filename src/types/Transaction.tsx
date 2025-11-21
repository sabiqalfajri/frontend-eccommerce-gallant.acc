export type statusOrder = 'PENDING' | 'PROCESSING' | 'SHIPPED'  | 'CANCELED' | 'EXPIRED' | 'COMPLETED'

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number
}

export interface TransactionOrder {
    id: string;
    publicId: string;
    totalAmount: number;
    status: string;
    items: OrderItem[];
}

export interface TransactionOrderByUserId {
    id: string;
    publicId: string;
    totalAmount: number;
    status: statusOrder;
    createdAt: string;
    items: {
        quantity: number;
        price: number;
        product: {
            id: string;
            name: string;
            image: string;
        }
    }[]
}

type BaseItem = {
    id: string;
    orderId: string;
    price: number;
    quantity: number;
    name: string;
    image: string
}

type BaseTransactionResponse = {
    id: string;
    publicId: string;
    totalAmount: number;
    status: string;
    paymentType: string;
    qrisUrl: string;
    qrisExpiryAt: string;
    transactionId: string;
    createdAt: string;
    updatedAt: string;
}

export interface TransactionResponse extends BaseTransactionResponse {
    items: BaseItem;
}

export interface BaseTransactionOrderPaginated extends BaseTransactionResponse {
    customer: {
        name: string;
        email: string;
        image: string
    }
    items: BaseItem[]
}

export interface TransactionOrderPaginated {
    orders: BaseTransactionOrderPaginated[];
    total: number;
    page: number;
    rowsPerPage: number;
    totalPages: number;
}

export interface RecentOrder {
    publicId: string;
    totalAmount: number;
    status: statusOrder;
    createdAt: string;
    customer: { name: string }
}

export interface TransactionOrderPayload {
    items: { productId: string; quantity: number }[]
}