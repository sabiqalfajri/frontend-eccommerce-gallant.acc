import { createContext, Dispatch, SetStateAction } from "react";

export interface CheckoutTransitionContextType {
  skipNextAddressValidation: boolean;
  setSkipNextAddressValidation: Dispatch<SetStateAction<boolean>>;
}

export const CheckoutTransitionContext =
  createContext<CheckoutTransitionContextType | null>(null);