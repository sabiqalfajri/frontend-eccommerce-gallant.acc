import { fetchTransactionOrderByUserId } from "@/api/TransactionApi";
import { TransactionOrderByUserId } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query"

export const useTransactionOrderByUserId = (token: string) => {
    const {
        data = [],
        isLoading,
        isFetched,
        isError
    } = useQuery<TransactionOrderByUserId[]>({
        queryKey: ["orders"],
        queryFn: () => fetchTransactionOrderByUserId(token),
        refetchInterval: false,
        enabled: !!token
    });

    return {
        transactionList: data,
        isLoadingTransactionList: isLoading,
        isFetchedTransactionList: isFetched,
        isErrorTransactionList: isError,
    }
}