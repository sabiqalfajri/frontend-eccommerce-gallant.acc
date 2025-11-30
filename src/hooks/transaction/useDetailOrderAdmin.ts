import { fetchDetailOrderByPublicId } from "@/api/TransactionApi";
import { TransactionOrderDetailAccount } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query"

export const useDetailOrderAdmin = (token: string, publicId: string) => {
    const {
        data,
        isLoading,
        isFetched,
        isError
    } = useQuery<TransactionOrderDetailAccount>({
        queryKey: ["detailOrderAdmin", publicId],
        queryFn: () => fetchDetailOrderByPublicId(token, publicId),
        refetchInterval: false,
        enabled: !!token
    });

    return {
        detailOrderAdmin: data,
        isLoadingDetailOrderAdmin: isLoading,
        isFetchedDetailOrderAdmin: isFetched,
        isErrorDetailOrderAdmin: isError,
    }
}