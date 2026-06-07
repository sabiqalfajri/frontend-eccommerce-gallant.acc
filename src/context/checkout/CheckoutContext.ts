import { createContext } from "react";
import { CartItem } from "@/types/Cart";

export interface CheckoutContextProps {
  checkoutItems: CartItem[];
  setCheckoutItems: (items: CartItem[]) => void;
  clearCheckout: () => void;
}

export const CheckoutContext =
  createContext<CheckoutContextProps | undefined>(undefined);