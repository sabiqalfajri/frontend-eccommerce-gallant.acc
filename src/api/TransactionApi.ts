import { TransactionOrder, TransactionResponse } from "@/types/Transaction";
import { axiosClient } from "./AxiosClient";
import { ApiResponse } from "@/types/ApiResponse";

export const fetchTransaction = async (token: string, orderId: string) => {
    const response = await axiosClient.get<{ data: TransactionResponse }>(`/payment/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}

export const createTransactionOrder = async (
    token: string, 
    items: { cartItemId: string; productId: string; quantity: number }[]
) => {
    const response = await axiosClient.post<ApiResponse<TransactionOrder>>('orders/create', {
        items
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}

export const createTransactionPayment = async (token: string, id: string) => {
    const response = await axiosClient.post<ApiResponse<{ transactionId: string }>>(`/payment/create/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}