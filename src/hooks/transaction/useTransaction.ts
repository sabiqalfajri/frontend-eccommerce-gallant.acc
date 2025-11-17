import { fetchTransaction } from "@/api/TransactionApi";
import { TransactionResponse } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query"

export const useTransaction = (token: string, orderId: string) => {
    const {
        data,
        isLoading,
        isFetched,
        refetch,
        isRefetching,
        isError
    } = useQuery<TransactionResponse>({
        queryKey: ["orders", orderId],
        queryFn: () => fetchTransaction(token, orderId),
        refetchInterval: false,
        enabled: !!token && !!orderId 
    });

    return {
        transaction: data,
        isLoadingTransaction: isLoading,
        isFetchedTransaction: isFetched,
        isRefetchingTransaction: isRefetching,
        isErrorTransaction: isError,
        refetch
    }
}