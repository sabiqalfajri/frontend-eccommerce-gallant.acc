import { fetchCategories } from "@/api/CategoryApi";
import { CategoryUser } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
    const { 
        data, 
        isLoading,
        isFetched, 
        isError 
    } = useQuery<CategoryUser[]>({
        queryKey: ["category"],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 5
    });

    return {
        categories: data,
        isLoadingCategory: isLoading,
        isFetchedCategory: isFetched,
        isErrorCategory: isError
    }
}