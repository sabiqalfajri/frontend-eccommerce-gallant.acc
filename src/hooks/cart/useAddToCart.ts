import { addToCart } from "@/api/CartApi"
import { CartItem, CartItemPayload, CartResponse } from "@/types/Cart"
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useAddToCart = (token: string) => {
    const queryClient = useQueryClient();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const addMutation = useMutation<CartItem, Error, CartItemPayload, { previousCart: CartResponse | undefined }>({
        mutationFn: async (payload) => {
            return await addToCart({ ...payload, token })
        },
        onMutate: async (vars) => {
            setLoadingId(vars.productId)
            await queryClient.cancelQueries({ queryKey: ["cart"] })
            const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);

            queryClient.setQueryData<CartResponse>(["cart"], (old) => {
                if (!old) {
                    return {
                        items: [],
                        grandTotal: 0,
                        totalProduct: 0,
                    };
                }

                const existing = old.items.find((item) => item.productId === vars.productId);
                let updatedItems: CartItem[];
                
                if(existing) {
                    updatedItems = old.items.map(i => i.productId === vars.productId ? 
                        { 
                            ...i, 
                            quantity: i.quantity + vars.quantity,
                            totalPrice: (i.quantity + vars.quantity) * i.product.price,
                        } : i
                    )
                } else {
                    updatedItems = [
                        ...old.items,
                        {
                            id: `temp-${Math.random()}`,
                            quantity: vars.quantity,
                            productId: vars.productId,
                            totalPrice: 0,
                            product: {
                                name: "Loading...",
                                price: 0,
                                stock: 0,
                                images: [{ url: "" }],
                            }
                        }
                    ]
                }

                const grandTotal = updatedItems.reduce((sum, i) => sum + i.totalPrice, 0);
                const totalProduct = updatedItems.reduce((sum, i) => sum + i.quantity, 0);

                return {
                    ...old,
                    items: updatedItems,
                    grandTotal,
                    totalProduct
                }
            })

            return { previousCart }
        },
        onError: (error, _vars, context) => {
            if(context?.previousCart) {
                queryClient.setQueryData(["cart"], context.previousCart)
            }
            showError(error.message || 'Something went wrong')
        },
        onSuccess: (data, variables) => {
            showInfo("Produk berhasil ditambahkan ke keranjang");
            queryClient.setQueryData<CartResponse>(["cart"], (old) => {
                if (!old) return old;

                const updatedItems = old.items.map((i) => 
                    i.id.startsWith("temp-") && i.productId === variables.productId ? 
                    { ...i, ...data } : i
                );

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
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            setLoadingId(null)
        }
    })

    return {
        addToCart: addMutation.mutateAsync,
        isAddingToCart: addMutation.isPending,
        loadingId
    }
}