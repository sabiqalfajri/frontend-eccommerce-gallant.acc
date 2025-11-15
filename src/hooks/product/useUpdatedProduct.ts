import { updatedProductForAdmin } from "@/api/ProductApi";
import { UpdateProductPayload } from "@/types/Product";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProduct = (token: string) => {
    const queryClient = useQueryClient();

    const updateProductMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: UpdateProductPayload }) => {
            if (!token) throw new Error("Unauthorized");
            return updatedProductForAdmin(token, id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productsAdmin"] });
            queryClient.invalidateQueries({ queryKey: ["productById"] });
            showInfo("Product updated successfully!");
        },
        onError: (error: any) => {
            showError(error.message || 'Something went wrong');
        }
    });

    return {
        updateProduct: updateProductMutation.mutateAsync,
        isUpdating: updateProductMutation.isPending,
    };
};
