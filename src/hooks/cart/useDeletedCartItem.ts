import { deleteCartItem } from "@/api/CartApi"
import { CartItem, CartResponse } from "@/types/Cart";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";

export const useDeletedCartItem = (token: string) => {
    const queryClient = useQueryClient();
    const [isDeletingIds, setIsDeletingIds] = useState<string[]>([])

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            return await deleteCartItem(token, id)
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["cart"] })
            const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);

            queryClient.setQueryData<CartResponse>(["cart"], (old) => {
                if(!old) return old;

                const updatedItems = old.items.filter((item) => item.id !== id);
                const grandTotal = updatedItems.reduce((sum, i) => sum + i.totalPrice, 0);
                const totalProduct = updatedItems.reduce((sum, i) => sum + i.quantity, 0);

                return {
                    ...old,
                    items: updatedItems,
                    grandTotal,
                    totalProduct,
                }
            })

            setIsDeletingIds(prev => [...prev, id])
            return { previousCart }
        },
        onError: (error, _id, context) => {
            if(context?.previousCart) {
                queryClient.setQueryData(["cart"], context.previousCart)
            }
            showError(error.message || 'Something went wrong')
        },
        // onSuccess: () => {
        //     showInfo('')
        // },
        onSettled: (_data, _error, id) => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            setIsDeletingIds((prev) => prev.filter((itemId) => itemId !== id))
        }
    })

    return {
        deleteCartItem: deleteMutation.mutateAsync,
        isDeletingCartItem: deleteMutation.isPending,
        isDeletingIds
    }
}