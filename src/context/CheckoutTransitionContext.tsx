import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface CheckoutTransitionContextType {
    skipNextAddressValidation: boolean;
    setSkipNextAddressValidation: Dispatch<SetStateAction<boolean>>;
}

const CheckoutTransitionContext = createContext<CheckoutTransitionContextType | null>(null)

export const CheckoutTransitionProvider = ({ children }: { children: React.ReactNode }) => {
    const [skipNextAddressValidation, setSkipNextAddressValidation] = useState(false);

    return (
        <CheckoutTransitionContext.Provider
        value={{ 
            skipNextAddressValidation, 
            setSkipNextAddressValidation 
        }}
        >
            {children}
        </CheckoutTransitionContext.Provider>
    )
};

export const useCheckoutTransition = () => {
    const ctx = useContext(CheckoutTransitionContext);
    if(!ctx) throw new Error("useCheckoutTransition must be used within a CheckouttransitionProvider");
    return ctx;
}