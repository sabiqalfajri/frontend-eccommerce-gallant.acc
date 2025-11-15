import { useState } from "react"

export const useProductQuantity = (initial = 1, max?: number) => {
    const [quantity, setQuantity] = useState(initial);

    const increase = () => {
        setQuantity(prev => (max && prev >= max ? prev : prev + 1))
    }
    const decrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : prev))
    };

    const reset = () => setQuantity(initial);
    return {
        quantity,
        increase,
        decrease,
        reset,
        setQuantity
    }
}