import { fetchProductById } from "@/api/ProductApi"
import { useQuery } from "@tanstack/react-query"

export const useProductById = (id: string) => {
    const {
        data,
        isLoading,
        isFetched, 
    } = useQuery({
        queryKey: ["productById", id],
        queryFn: () => fetchProductById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 1
    });

    return {
        dataProductById: data,
        isLoadingProductById: isLoading,
        isFetchedProductById: isFetched
    }
}