import { fetchProductById } from "@/api/ProductApi";
import { ProductPaginated } from "@/types/Product";
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useProductForEdit = (id: string) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["productById", id],
        queryFn: () => fetchProductById(id),
        initialData: () => {
            const queries = queryClient.getQueriesData<ProductPaginated>(
                { queryKey: ["productsAdmin"] }
            );
            console.log('queries category', queries);
            for(const [, data] of queries) {
                const found = data?.products?.find(p => p.id === id);
                if(found) {
                    return {
                        id: found.id,
                        name: found.name,
                        description: found.description,
                        price: found.price,
                        visibility: found.visibility,
                        stock: found.stock,
                        categoryId: "", 
                        categoryName: found.categoryName,
                        images: found.imageUrl
                        ? [{ url: found.imageUrl }]
                        : []
                    };
                    
                }
            }

            return undefined
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 1,
        refetchOnMount: false
    });
}