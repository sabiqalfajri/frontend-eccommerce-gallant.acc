import { useEffect, useState } from "react";
import { CartItem } from "@/types/Cart";
import { CheckoutContext } from "./CheckoutContext";

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>(() => {
    try {
        const saved = sessionStorage.getItem("checkoutItems");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
  });

  useEffect(() => {
    sessionStorage.setItem(
      "checkoutItems",
      JSON.stringify(checkoutItems)
    );
  }, [checkoutItems]);

  const clearCheckout = () => {
    setCheckoutItems([]);
    sessionStorage.removeItem("checkoutItems");
  };

  return (
    <CheckoutContext.Provider
      value={{
        checkoutItems,
        setCheckoutItems,
        clearCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};