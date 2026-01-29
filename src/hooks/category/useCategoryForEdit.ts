import { fetchCategoryById } from "@/api/CategoryApi";
import { CategoryAdminPaginated } from "@/types/Category";
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useCategoryForEdit = (id: string) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["categoryById", id],
        queryFn: () => fetchCategoryById(id),
        initialData: () => {
            const queries = queryClient.getQueriesData<CategoryAdminPaginated>({ queryKey: ["categoryAdmin"] });
            console.log('queries category', queries);
            for(const [, data] of queries) {
                const found = data?.categories?.find(c => c.id === id);
                console.log('data categoryId', found);
                if(found) return found
            }

            return undefined
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 1,
        refetchOnMount: false
    });
}