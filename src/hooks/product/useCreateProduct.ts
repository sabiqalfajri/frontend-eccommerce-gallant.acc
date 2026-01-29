import { createProductForAdmin } from "@/api/ProductApi";
import { ProductPayload } from "@/types/Product";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = (token: string) => {
    const queryClient = useQueryClient();

    const createProductMutation = useMutation({
        mutationFn: (data: ProductPayload) => {
            if(!token) throw new Error("Unauthorized");
            return createProductForAdmin(token, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productsAdmin"] });

            showInfo("Berhasil membuat produk baru.");
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    })

    return {
        createProduct: createProductMutation.mutateAsync,
        isCreating: createProductMutation.isPending,
    }
}