import { createCategoryForAdmin } from "@/api/CategoryApi";
import { CategoryAdmin, CategoryAdminPaginated, CreateCategoryPayload } from "@/types/Category";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query"

export const useCreateCategory = (token: string | null) => {
    const queryClient = useQueryClient();

    const createCategoryMutation = 
        useMutation<CategoryAdmin, Error, CreateCategoryPayload, { previousQueries: [QueryKey, CategoryAdminPaginated | undefined][] }>({
        mutationFn: (payload) => {
            if (!token) throw new Error("Unauthorized");
            return createCategoryForAdmin(token, payload);
        },
        onMutate: async (vars) => {
            await queryClient.cancelQueries({ queryKey: ["categoryAdmin"] });
            const previousQueries =
                queryClient.getQueriesData<CategoryAdminPaginated>({
                queryKey: ["categoryAdmin"],
            });

            const optimisticCategory: CategoryAdmin = {
                id: `temp-${Date.now()}`,
                name: vars.name,
                image: URL.createObjectURL(vars.file),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                totalProducts: 0,
            }

            previousQueries.forEach(([queryKey, oldData]) => {
                if (!oldData) return;

                queryClient.setQueryData<CategoryAdminPaginated>(queryKey, {
                    ...oldData,
                    categories: [optimisticCategory, ...oldData.categories],
                    total: oldData.total + 1,
                });
            });

            return { previousQueries }
        },
        onSuccess: () => {
            showInfo("Kategori berhasil dibuat.");
        },
        onError: (error, _vars, context) => {
            context?.previousQueries.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });
            showError(error.message || 'Something went wrong');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["categoryAdmin"] });
        }
    });

    return {
        createCategory: createCategoryMutation.mutateAsync,
        isCreatingCategory: createCategoryMutation.isPending
    }
}