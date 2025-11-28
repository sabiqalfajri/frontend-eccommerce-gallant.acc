import { updateStatusOrderForAdmin } from "@/api/TransactionApi";
import { showError } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatusOrderAdmin = (token: string | null) => {
    const queryClient = useQueryClient();

    const updateOrderStatusMutation = useMutation({
        mutationFn: async ({
            orderId,
            newStatus
        }: { 
            orderId: string;
            newStatus: string;
        }) => {
            if(!token) throw new Error("Unauthorized");
            return updateStatusOrderForAdmin(token, orderId, newStatus)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ordersAdmin"] });
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    });

    return {
        updateOrderStatusAdmin: updateOrderStatusMutation.mutateAsync,
        isUpdatingOrderStatusAdmin: updateOrderStatusMutation.isPending,
        isErrorUpdateOrderStatusAdmin: updateOrderStatusMutation.isError
    }
}