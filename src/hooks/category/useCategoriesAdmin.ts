import { fetchCategoriesForAdmin } from "@/api/CategoryApi";
import { CategoryAdminPaginated } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";

export const useCategoriesAdmin = (token: string, page = 1, rowsPerPage = 10) => {
    const { 
        data, 
        isLoading,
        isFetched, 
        isError 
    } = useQuery<CategoryAdminPaginated>({
        queryKey: ["categoryAdmin", page, rowsPerPage],
        queryFn: () => fetchCategoriesForAdmin(token, page, rowsPerPage),
        staleTime: 1000 * 60 * 5,
    });

    return {
        categoriesAdmin: data?.categories || [],
        total: data?.total || 0,
        page: data?.page || 1,
        rowsPerPage: data?.rowsPerPage || 10,
        totalPages: data?.totalPages || 1,
        isLoading,
        isFetched,
        isError
    }
}