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
        // queryFn: () => fetchDetailOrderByPublicId(token, publicId),
        queryFn: async () => {
            const res = await fetchDetailOrderByPublicId(token, publicId);
            if(!res) {
                throw new Error("Detail order not found");
            };
            return res
        },
        refetchInterval: false,
        enabled: !!token,
        retry: (failureCount, error: any) => {
            return error.message !== "Detail order not found" && failureCount < 2;
        }
    });

    return {
        detailOrderUser: data,
        isLoadingDetailOrderUser: isLoading,
        isFetchedDetailOrderUser: isFetched,
        isErrorDetailOrderUser: isError,
    }
}