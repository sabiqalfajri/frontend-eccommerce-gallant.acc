import { createTransactionOrder } from "@/api/TransactionApi";
import { showError } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateOrder = (token: string | null) => {
    const queryClient = useQueryClient();

    const createOrderMutation = useMutation({
        mutationFn: async (items: { cartItemId: string; productId: string; quantity: number }[]) => {
            if(!token) throw new Error("Unauthorized");
            return createTransactionOrder(token, items)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    })

    return {
        createTransactionOrder: createOrderMutation.mutateAsync,
        isCreatingTransactionOrder: createOrderMutation.isPending,
        isErrorCreateTransactionOrder: createOrderMutation.isError
    }
}