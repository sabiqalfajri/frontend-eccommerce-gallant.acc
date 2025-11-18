type statusOrder = 'PENDING' | 'PROCESSING' | 'SHIPPED'  | 'CANCELED' | 'EXPIRED' | 'COMPLETED'

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

export interface TransactionResponse {
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
    items: {
        id: string;
        orderId: string;
        price: number;
        quantity: number;
        name: string;
        image: string
    };
}

export interface TransactionOrderPayload {
    items: { productId: string; quantity: number }[]
}