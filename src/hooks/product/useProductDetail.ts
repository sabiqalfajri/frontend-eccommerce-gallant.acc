import { fetchProductDetail } from "@/api/ProductApi";
import { DetailProduct } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export const useProductDetail = (id: string) => {
    const { data: product, isLoading, isFetched, isFetching, error } = useQuery<DetailProduct>({
        queryKey: ["productDetail", id],
        queryFn: () => fetchProductDetail(id),
        enabled: !!id,
    });

    return { product, isLoading, isFetched, isFetching, error }
}