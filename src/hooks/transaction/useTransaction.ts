import { fetchTransaction } from "@/api/TransactionApi";
import { TransactionResponse } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query"

export const useTransaction = (
    token: string, 
    orderId: string, 
) => {
    const {
        data,
        isLoading,
        isFetched,
        refetch,
        isRefetching,
        isError
    } = useQuery<TransactionResponse>({
        queryKey: ["orders", orderId],
        // queryFn: () => fetchTransaction(token, orderId),
        queryFn: async () => {
            const res = await fetchTransaction(token, orderId);
            if(!res) {
                throw new Error("Transaction not found");
            };
            return res
        },
        refetchInterval: false,
        enabled: !!token && !!orderId,
        retry: (failureCount, error: any) => {
            return error.message !== "Transaction not found" && failureCount < 2;
        }
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