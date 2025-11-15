import { fetchAllProductsForUser } from "@/api/ProductApi";
import { useFilter } from "@/context/FilterContext";
import { useQuery } from "@tanstack/react-query";

export const useProductsForUser = () => {
    const { selectedCategories, startPrice, endPrice } = useFilter();
    const queryParams: Record<string, string> = {}

    if(selectedCategories.length > 0) {
        queryParams.categoryId = selectedCategories.join(',') 
    }
    if(startPrice !== undefined) {
        queryParams.startPrice = startPrice.toString()
    }
    if(endPrice !== undefined) {
        queryParams.endPrice = endPrice.toString()
    }

    const { data, isLoading, isFetched, isError } = useQuery({
        queryKey: ["products", queryParams],
        queryFn: () => fetchAllProductsForUser(queryParams),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    })

    return {
        productsUser: data,
        isLoadingProductsUser: isLoading,
        isFetchedProductUser: isFetched,
        isErrorProductUser: isError
    }
}