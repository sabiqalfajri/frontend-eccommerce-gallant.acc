import { CartItem, CartItemPayload, CartResponse, UpdateCartItemQuantityPayload } from "@/types/Cart"
import { axiosClient } from "./AxiosClient"
import { ApiResponse } from "@/types/ApiResponse"

export const fetchCart = async (token: string) => {
    const response = await axiosClient.get<{ data: CartResponse }>('/cart', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data.data
}

export const addToCart = async ({
    token, productId, quantity,
}: CartItemPayload & { token: string }) => {
    const response = await axiosClient.post<ApiResponse<CartItem>>('/cart/add', {
        productId,
        quantity
    }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data.data
}

export const updateCartItemQuantity = async ({
    token, id, quantity,
}: UpdateCartItemQuantityPayload & { token: string }) => {
    const response = await axiosClient.put<ApiResponse<CartItem>>(`/cart/update/${id}`, {
        quantity
    }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data.data
}

export const deleteCartItem = async (token: string, id: string) => {
    console.log('token delete', token)
    const response = await axiosClient.delete(`/cart/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data.data
}

export const deletedCartAfterOrder = async () => {

}