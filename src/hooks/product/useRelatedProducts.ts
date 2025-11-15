import { fetchRelatedProducts } from "@/api/ProductApi";
import { useQuery } from "@tanstack/react-query";

export const useRelatedProducts = (id: string) => {
    const { data, isLoading, isFetched, isError } = useQuery({
        queryKey: ["relatedProducts", id],
        queryFn: () => fetchRelatedProducts(id),
        refetchOnWindowFocus: false
    })

    return {
        relatedProducts: data,
        isLoadingRelatedProducts: isLoading,
        isFetchedRelatedProducts: isFetched,
        isErrorRelatedProducts: isError
    }
}