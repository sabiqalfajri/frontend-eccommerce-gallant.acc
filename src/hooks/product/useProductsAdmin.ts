import { fetchAllProductsForAdmin } from "@/api/ProductApi";
import { filterProduct, ProductPaginated } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export const useProductsAdmin = (token: string, visibility: filterProduct | string, page = 1, rowsPerPage = 10) => {
    const { 
        data, 
        isLoading,
        isFetched, 
        isFetching, 
        error 
    } = useQuery<ProductPaginated>({
        queryKey: ["productsAdmin", visibility, page, rowsPerPage],
        queryFn: () => fetchAllProductsForAdmin(token, visibility, page, rowsPerPage),
        enabled: !!token,
        staleTime: 1000 * 60 * 5
    });

    return { 
        products: data?.products || [],
        total: data?.total || 0,
        page: data?.page || 1,
        rowsPerPage: data?.rowsPerPage || 10,
        totalPages: data?.totalPages || 1,
        isLoading,
        isFetching,
        isFetched,
        error
    }
}