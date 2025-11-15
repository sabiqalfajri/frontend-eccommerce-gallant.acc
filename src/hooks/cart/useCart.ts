import { fetchCart } from "@/api/CartApi";
import { CartResponse } from "@/types/Cart";
import { useQuery } from "@tanstack/react-query";

export const useCart = (token: string) => {
    const { 
        data, 
        isLoading,
        isFetched, 
        isFetching, 
        error 
    } = useQuery<CartResponse>({
        queryKey: ["cart"],
        queryFn: () => fetchCart(token),
        enabled: !!token,
        staleTime: 1000 * 60 * 5
    });

    return {
        cartItem: data,
        isLoadingCartItem: isLoading,
        isFetchedCartItem: isFetched
    }
}