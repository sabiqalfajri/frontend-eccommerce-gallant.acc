import { RecentOrder, statusOrder, TransactionOrder, TransactionOrderByUserId, TransactionOrderPaginated, TransactionResponse } from "@/types/Transaction";
import { axiosClient } from "./AxiosClient";
import { ApiResponse } from "@/types/ApiResponse";

// admin only
export const fetchTransactionOrderForAdmin = async (
    token: string,
    status: statusOrder | string, 
    page = 1, 
    rowsPerPage = 10
) => {
    const response = await axiosClient.get<{ data: TransactionOrderPaginated }>('/orders/admin', {
        params: {
            status,
            page,
            rowsPerPage
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}

export const fetchRecentOrderForAdmin = async (token: string) => {
    const response = await axiosClient.get<{ data: RecentOrder[] }>('/orders/admin/recent', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}

export const updateStatusOrderForAdmin = async () => {

}

// user only
export const fetchTransaction = async (token: string, orderId: string) => {
    const response = await axiosClient.get<{ data: TransactionResponse }>(`/payment/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}

export const fetchTransactionOrderByUserId = async (token: string) => {
    const response = await axiosClient.get<{ data: TransactionOrderByUserId[] }>('/orders', {
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
