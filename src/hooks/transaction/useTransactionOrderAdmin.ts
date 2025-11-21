import { fetchTransactionOrderForAdmin } from "@/api/TransactionApi";
import { statusOrder, TransactionOrderPaginated } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query";

export const useTransactionOrderAdmin = (
    token: string, 
    status: statusOrder | string, 
    page = 1, 
    rowsPerPage = 10
) => {
    const { 
        data, 
        isLoading,
        isFetched, 
        isFetching, 
        error 
    } = useQuery<TransactionOrderPaginated>({
        queryKey: ["ordersAdmin", status, page, rowsPerPage],
        queryFn: () => fetchTransactionOrderForAdmin(token, status, page, rowsPerPage),
        enabled: !!token,
        staleTime: 1000 * 60 * 5
    });

    return { 
        orders: data?.orders || [],
        total: data?.total || 0,
        page: data?.page || 1,
        rowsPerPage: data?.rowsPerPage || 10,
        totalPages: data?.totalPages || 1,
        isLoading,
        isFetching,
        isFetched,
        error
    }
}