import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const CartEmpty = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center gap-3 border-transparent md:border md:border-gray-200 rounded-md py-5 h-[calc(100vh-34vh)] md:h-fit">
            <img 
            src="/images/cart-empty.png" 
            alt="cartEmpty" 
            className="w-24 h-24 md:w-28 md:h-28 object-contain" 
            />
            <div className="flex flex-col text-center mt-1">
                <h1 className="font-semibold text-[18px] md:text-2xl">Your cart is empty!</h1>
                <div className="text-gray-500 text-[13px] md:text-base">
                    <p className="mt-2">You have no items in your shopping cart.</p>
                    <p>Let's go buy something</p>
                </div>
            </div>
            <Button 
            className="w-full md:w-fit px-5"
            size="lg"
            onClick={() => navigate('/shop')}
            >
                Start Shopping
            </Button>
        </div>
    )
}