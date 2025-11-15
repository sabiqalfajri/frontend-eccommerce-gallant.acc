import { updateCartItemQuantity } from "@/api/CartApi"
import { CartItem, CartResponse, UpdateCartItemQuantityPayload } from "@/types/Cart"
import { showError } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useUpdateCart = (token: string) => {
    const queryClient = useQueryClient();
    const [loadingItemIds, setLoadingItemIds] = useState<string[]>([]);

    const updateMutation = useMutation<CartItem, Error, UpdateCartItemQuantityPayload, { previousCart: CartResponse | undefined }>({
        mutationFn: async (payload) => {
            return await updateCartItemQuantity({ ...payload, token })
        },
        onMutate: async ({ id, quantity }) => {
            await queryClient.cancelQueries({ queryKey: ["cart"] })
            const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);

            queryClient.setQueryData<CartResponse>(["cart"], (old) => {
                if(!old) return old;

                const updatedItems = old.items.map((item) => item.id === id ? {
                    ...item,
                    quantity,
                    totalPrice: item.product.price * quantity
                } : item);

                const grandTotal = updatedItems.reduce((sum, i) => sum + i.totalPrice, 0);
                const totalProduct = updatedItems.reduce((sum, i) => sum + i.quantity, 0);

                return {
                    ...old,
                    items: updatedItems,
                    grandTotal,
                    totalProduct
                }
            })

            setLoadingItemIds(prev => [...prev, id])
            return { previousCart }
        },
        onError: (error, _vars, context) => {
            if(context?.previousCart) {
                queryClient.setQueryData(["cart"], context.previousCart)
            }
            showError(error.message || 'Something went wrong')
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData<CartResponse>(["cart"], (old) => {
                if(!old) return old;

                const updatedItems = old.items.map((i) => i.id === variables.id ? 
                    { ...i, ...data } : i
                )

                const grandTotal = updatedItems.reduce((sum, i) => sum + i.totalPrice, 0);
                const totalProduct = updatedItems.reduce((sum, i) => sum + i.quantity, 0);

                return {
                    ...old,
                    items: updatedItems,
                    grandTotal,
                    totalProduct,
                };
            });
        },
        onSettled: (_data, _error, variables) => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            setLoadingItemIds((prev) => prev.filter((itemId) => itemId !== variables.id))
        }
    })

    return {
        updateCart: updateMutation.mutateAsync,
        isUpdatingCart: updateMutation.isPending,
        loadingItemIds
    }
}