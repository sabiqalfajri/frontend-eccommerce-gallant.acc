import { fetchNewArrivals } from "@/api/ProductApi";
import { useQuery } from "@tanstack/react-query";

export const useNewArrivals = () => {
    const { data, isLoading, isFetched, isError } = useQuery({
        queryKey: ["newArrivals"],
        queryFn: fetchNewArrivals,
        refetchOnWindowFocus: false
    })

    return {
        newArrivals: data,
        isLoadingNewArrivals: isLoading,
        isFetchedNewArrivals: isFetched,
        isErrorNewArrivals: isError
    }
}