import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const AddressEmpty = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center gap-3 border-transparent md:border md:border-gray-200 rounded-md py-0 md:py-5 h-[calc(100vh-20vh)] md:h-fit">
            <img 
            src="/images/address-empty.png" 
            alt="addressEmpty" 
            className="w-[4.4rem] h-[4.4rem] md:w-[5.3rem] md:h-[5.3rem] object-contain" 
            />
            <div className="flex flex-col text-center mt-1">
                <h1 className="font-semibold text-[18px] md:text-2xl">No address found!</h1>
                <div className="text-gray-500 text-[13px] md:text-base">
                    <p className="mt-2">You haven't added any address yet.</p>
                    <p>Add an address to proceed.</p>
                </div>
            </div>
            <Button 
            className="w-full md:w-fit px-5"
            onClick={() => navigate('/customer/address/add')}
            variant="primary"
            size="lg"
            >
                Add New Address
            </Button>
        </div>
    )
}