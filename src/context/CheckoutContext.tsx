import { CartItem } from "@/types/Cart";
import { createContext, useContext, useEffect, useState } from "react";

interface CheckoutContextProps {
    checkoutItems: CartItem[];
    setCheckoutItems: (items: CartItem[]) => void;
    clearCheckout: () => void
}

const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [checkoutItems, setCheckoutItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('checkoutItems');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('checkoutItems', JSON.stringify(checkoutItems))
    }, [checkoutItems])

    const clearCheckout = () => {
        setCheckoutItems([]);
        localStorage.removeItem("checkoutItems");
    };
    
    return (
        <CheckoutContext.Provider
        value={{ checkoutItems, setCheckoutItems, clearCheckout }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}

export const useCheckout = () => {
    const ctx = useContext(CheckoutContext);
    if(!ctx) throw new Error("useCheckout must be used within a CheckoutProvider");
    return ctx;
}