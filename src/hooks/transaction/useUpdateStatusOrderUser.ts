import { updateStatusOrderForUser } from "@/api/TransactionApi";
import { showError } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatusOrderUser = (token: string | null) => {
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
            return updateStatusOrderForUser(token, orderId, newStatus)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    });

    return {
        updateOrderStatusUser: updateOrderStatusMutation.mutateAsync,
        isUpdatingOrderStatusUser: updateOrderStatusMutation.isPending,
        isErrorUpdateOrderStatusUser: updateOrderStatusMutation.isError
    }
}