import { fetchBestSellerForUser } from "@/api/ProductApi";
import { useQuery } from "@tanstack/react-query";

export const useBestSeller = () => {
    const { data, isLoading, isFetched, isError } = useQuery({
        queryKey: ["bestSeller"],
        queryFn: fetchBestSellerForUser,
        refetchOnWindowFocus: false
    })

    return {
        bestSeller: data,
        isLoadingBestSeller: isLoading,
        isFetchedBestSeller: isFetched,
        isErrorBestSeller: isError
    }
}