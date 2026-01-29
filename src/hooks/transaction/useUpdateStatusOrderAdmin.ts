import { updateStatusOrderForAdmin } from "@/api/TransactionApi";
import { statusOrder, TransactionOrderPaginated } from "@/types/Transaction";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatusOrderAdmin = (token: string | null) => {
    const queryClient = useQueryClient();

    const updateOrderStatusMutation = useMutation({
        mutationFn: async ({
            orderId,
            newStatus
        }: { 
            orderId: string;
            newStatus: statusOrder;
        }) => {
            if(!token) throw new Error("Unauthorized");
            return updateStatusOrderForAdmin(token, orderId, newStatus)
        },
        onMutate: async ({ orderId, newStatus }) => {
            await queryClient.cancelQueries({ queryKey: ["ordersAdmin"] });
            await queryClient.cancelQueries({ queryKey: ["detailOrderAdmin", orderId] });

            const previousQueries = queryClient.getQueriesData<TransactionOrderPaginated>({
                queryKey: ["ordersAdmin"]
            })

            queryClient.setQueriesData<TransactionOrderPaginated>(
                {queryKey: ["ordersAdmin"]},
                (old) => {
                    if(!old) return;

                    return {
                        ...old,
                        orders: old.orders.map((order) => 
                            order.id === orderId
                            ? { ...order, status: newStatus }
                            : order
                        )
                    }
                }
            )

            return { previousQueries }
        },
        onSuccess: () => {
            showInfo('Status pesanan diperbarui')
        },
        onError: (_error, _vars, context) => {
            context?.previousQueries?.forEach(([key, data]) => {
                queryClient.setQueryData(key, data);
            });

            showError("Gagal update status order");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["ordersAdmin"] });
            queryClient.invalidateQueries({ queryKey: ["detailOrderAdmin"] });
        }
    });

    return {
        updateOrderStatusAdmin: updateOrderStatusMutation.mutateAsync,
        isUpdatingOrderStatusAdmin: updateOrderStatusMutation.isPending,
        isErrorUpdateOrderStatusAdmin: updateOrderStatusMutation.isError
    }
}