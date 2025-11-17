export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number
}

export interface TransactionOrder {
    id: string;
    userId: string;
    publicId: string;
    totalAmount: number;
    status: string;
    items: OrderItem[];
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