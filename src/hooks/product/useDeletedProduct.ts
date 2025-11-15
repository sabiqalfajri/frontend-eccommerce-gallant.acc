import { deletedProductBulk, deletedProductSingle } from "@/api/ProductApi";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletedProduct = (token: string) => {
    const queryClient = useQueryClient();

    const deletedProductMutation = useMutation({
        mutationFn: (id: string) => deletedProductSingle(token, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productsAdmin"] });

            showInfo("Product deleted successfully!");
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    })

    const deleteBulkMutation = useMutation({
        mutationFn: (ids: string[]) => deletedProductBulk(token, ids),
        onSuccess: (_, ids) => {
            queryClient.invalidateQueries({ queryKey: ["productsAdmin"] });

            showInfo(`${ids.length} selected product deleted successfully!`);
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    })

    return {
        deletedProductSingle: deletedProductMutation.mutateAsync,
        isDeletingSingle: deletedProductMutation.isPending,
        deletedProductBulk: deleteBulkMutation.mutateAsync,
        isDeletingBulk: deleteBulkMutation.isPending
    }
}