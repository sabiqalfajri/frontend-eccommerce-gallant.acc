export type ProductBase = {
    name: string;
    price: number;
    stock: number;
    images: { url: string }[]
}

export interface CartItem {
    id: string;
    quantity: number
    productId: string
    product: ProductBase
    totalPrice: number
}

export interface CartResponse {
    items: CartItem[]
    grandTotal: number;
    totalProduct: number
}

export interface CartItemPayload {
    productId: string;
    quantity: number
}

export interface UpdateCartItemQuantityPayload  {
    id: string;
    quantity: number
}