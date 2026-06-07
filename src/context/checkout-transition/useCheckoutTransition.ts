import { useContext } from "react";
import { CheckoutTransitionContext } from "./CheckoutTransitionContext";

export const useCheckoutTransition = () => {
  const ctx = useContext(CheckoutTransitionContext);

  if (!ctx) {
    throw new Error(
      "useCheckoutTransition must be used within a CheckoutTransitionProvider"
    );
  }

  return ctx;
};