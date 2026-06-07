import { ReactNode, useState } from "react";
import { CheckoutTransitionContext } from "./CheckoutTransitionContext";

export const CheckoutTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [skipNextAddressValidation, setSkipNextAddressValidation] = useState(false);

  return (
    <CheckoutTransitionContext.Provider
      value={{
        skipNextAddressValidation,
        setSkipNextAddressValidation,
      }}
    >
      {children}
    </CheckoutTransitionContext.Provider>
  );
};