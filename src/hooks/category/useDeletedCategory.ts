import { deleteSingleCategoryForAdmin, deleteBulkCategoryForAdmin } from "@/api/CategoryApi";
import { CategoryAdminPaginated } from "@/types/Category";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletedCategory = (token: string) => {
    const queryClient = useQueryClient();

    const deleteSingleCategoryMutation = useMutation({
        mutationFn: (id: string) => {
            if (!token) throw new Error("Unauthorized");
            return deleteSingleCategoryForAdmin(token, id);
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["categoryAdmin"] })
            const previousCategory = queryClient.getQueryData<CategoryAdminPaginated>(["categoryAdmin"]);

            if(previousCategory) {
                queryClient.setQueryData<CategoryAdminPaginated>(
                    ["categoryAdmin"],
                    {
                        ...previousCategory,
                        categories: previousCategory.categories.filter(
                            (cat) => cat.id !== id
                        ),
                        total: previousCategory.total - 1
                    }
                )
            }

            return { previousCategory }
        },
        onError: (error, _id, context) => {
            if(context?.previousCategory) {
                queryClient.setQueryData(["categoryAdmin"], context.previousCategory)
            }
            showError(error.message || 'Gagal menghapus kategori')
        },
        onSuccess: () => {
            showInfo('Kategori berhasil dihapus.')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["categoryAdmin"] });
        }
    });

    const deleteBulkCategoryMutation = useMutation({
        mutationFn: (ids: string[]) => {
            if (!token) throw new Error("Unauthorized");
            return deleteBulkCategoryForAdmin(token, ids);
        }, 
        onMutate: async (ids) => {
            await queryClient.cancelQueries({ queryKey: ["categoryAdmin"] })
            const previousCategory = queryClient.getQueryData<CategoryAdminPaginated>(["categoryAdmin"]);

            if(previousCategory) {
                queryClient.setQueryData<CategoryAdminPaginated>(
                    ["categoryAdmin"],
                    {
                        ...previousCategory,
                        categories: previousCategory.categories.filter(
                            (cat) => !ids.includes(cat.id)
                        ),
                        total: previousCategory.total - 1
                    }
                )
            }

            return { previousCategory }
        },
        onError: (error, _id, context) => {
            if(context?.previousCategory) {
                queryClient.setQueryData(["categoryAdmin"], context.previousCategory)
            }
            showError(error.message || 'Gagal menghapus kategori')
        },
        onSuccess: (_, ids) => {
            showInfo(`${ids.length} kategori berhasil dihapus.`);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["categoryAdmin"] });
        }
    })

    return {
        deleteSingleCategory: deleteSingleCategoryMutation.mutateAsync,
        isDeletingSingleCategory: deleteSingleCategoryMutation.isPending,
        deleteBulkCategory: deleteBulkCategoryMutation.mutateAsync,
        isDeletingBulkCategory: deleteBulkCategoryMutation.isPending
    }
}