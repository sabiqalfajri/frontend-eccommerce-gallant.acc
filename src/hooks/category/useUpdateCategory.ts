import { updateCategoryForAdmin } from "@/api/CategoryApi";
import { CategoryAdminPaginated, UpdateCategoryPayload } from "@/types/Category";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCategory = (token: string | null) => {
    const queryClient = useQueryClient();

    const updateCategoryMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: UpdateCategoryPayload }) => {
            if (!token) throw new Error("Unauthorized");
            return updateCategoryForAdmin(token, id, data);
        },
        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries({ queryKey: ["categoryAdmin"] });
            const previousQueries =
                queryClient.getQueriesData<CategoryAdminPaginated>({
                    queryKey: ["categoryAdmin"],
                });
            
            previousQueries.forEach(([queryKey, oldData]) => {
                if(!oldData) return;

                queryClient.setQueryData<CategoryAdminPaginated>(queryKey, {
                    ...oldData,
                    categories: oldData.categories.map(cat => 
                        cat.id === id
                            ? {
                                ...cat,
                                name: data.name ?? cat.name,
                                image: data.file 
                                    ? URL.createObjectURL(data.file)
                                    : cat.image
                              }
                            : cat
                    )
                })
            });

            return { previousQueries }
        },
        onSuccess: () => {
            showInfo("Kategori berhasil diperbarui.");
        },
        onError: (error, _vars, context) => {
            context?.previousQueries.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });
            showError(error.message || 'Something went wrong');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["categoryAdmin"] });
            queryClient.invalidateQueries({ queryKey: ["categoryById"] });
        }
    });

    return {
        updateCategory: updateCategoryMutation.mutateAsync,
        isUpdating: updateCategoryMutation.isPending,
    };
}