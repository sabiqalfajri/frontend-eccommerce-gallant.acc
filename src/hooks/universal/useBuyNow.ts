import { useCheckout } from "@/context/CheckoutContext"
import { useAddress } from "../address/useAddress";
import { useToken } from "./useToken";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CartItem } from "@/types/Cart";
import { showError } from "@/utils/Toast";
import { useAuth } from "@clerk/clerk-react";

export const useBuyNow = () => {
    const { token } = useToken();
    const { setCheckoutItems } = useCheckout();
    const { address, isFetchedAddress } = useAddress(token!);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { isSignedIn, isLoaded } = useAuth()

    const handleBuyNow = async (items: CartItem[]) => {
        if(!isLoaded) return;
        if(!isSignedIn) {
            navigate('/auth/sign-in');
            return
        }

        if (!items || items.length === 0 || !isFetchedAddress) return;

        if (!address || address.length === 0) {
            showError("Silakan tambahkan alamat pengiriman terlebih dahulu.");
            return navigate("/customer/address/add?redirect=/checkout");
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setCheckoutItems(items);

        navigate("/checkout");
        setIsLoading(false);
    }

    return { handleBuyNow, isLoading }
}