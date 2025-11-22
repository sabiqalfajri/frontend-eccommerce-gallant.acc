import { fetchDetailOrderByPublicId } from "@/api/TransactionApi";
import { TransactionOrderDetailAccount } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query"

export const useDetailOrderUser = (token: string, publicId: string) => {
    const {
        data,
        isLoading,
        isFetched,
        isError
    } = useQuery<TransactionOrderDetailAccount>({
        queryKey: ["detailOrderUser", publicId],
        queryFn: () => fetchDetailOrderByPublicId(token, publicId),
        refetchInterval: false,
        enabled: !!token
    });

    return {
        detailOrderUser: data,
        isLoadingDetailOrderUser: isLoading,
        isFetchedDetailOrderUser: isFetched,
        isErrorDetailOrderUser: isError,
    }
}