import { createTransactionPayment } from "@/api/TransactionApi";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePayment = (token: string | null) => {
    const queryClient = useQueryClient();

    const createPaymentMutation = useMutation({
        mutationFn: async (id: string) => {
            if(!token) throw new Error("Unauthorized");
            return createTransactionPayment(token, id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });

            showInfo("Pembayaran berhasil diproses!");
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    })

    return {
        createTransactionPayment: createPaymentMutation.mutateAsync,
        isCreatingTransactionPayment: createPaymentMutation.isPending,
        isErrorCreateTransactionPayment: createPaymentMutation.isError
    }
}