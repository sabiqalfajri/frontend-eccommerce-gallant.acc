import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const OrderEmpty = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center gap-3 border-transparent md:border md:border-gray-200 rounded-md py-0 md:py-5 h-[calc(100vh-21vh)] md:h-fit">
            <img 
            src="/images/order-empty.png" 
            alt="orderEmpty" 
            className="w-24 h-24 md:w-28 md:h-28 object-contain" 
            />
            <div className="flex flex-col text-center mt-1">
                <h1 className="font-semibold text-[18px] md:text-2xl">Your order list is empty!</h1>
                <div className="text-gray-500 text-[13px] md:text-base">
                    <p className="mt-2">You haven't made any purchases yet.</p>
                    <p>Start your first order now.</p>
                </div>
            </div>
            <Button 
            className="w-full md:w-fit px-5"
            onClick={() => navigate('/shop')}
            variant="primary"
            size="lg"
            >
                Start Shopping
            </Button>
        </div>
    )
}