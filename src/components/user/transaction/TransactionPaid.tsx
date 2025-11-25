import { TransactionResponse } from "@/types/Transaction"
import { FormatDateWithoutWib } from "@/utils/FormatDate"
import Lottie from "lottie-react"
import completedAnimation from "@/assets/completed.json"
import { Button } from "@/components/ui/button"
import { CircleCheckBig } from 'lucide-react';
import { useNavigate } from "react-router-dom"

interface TransactionPaidProps {
    data: TransactionResponse
}

export const TransactionPaid = ({ data }: TransactionPaidProps) => {
    const { totalAmount, publicId } = data;
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-[calc(100vh-20vh)] md:h-fit">
            <div className="flex flex-col w-full max-w-[25rem]">
                <div className="flex flex-col items-center">
                    <Lottie 
                        className="w-24 h-24 md:w-32 md:h-32"
                        animationData={completedAnimation}
                        loop
                        autoPlay
                    />
                    <h1 className="font-semibold text-lg">Payment Success!</h1>
                    <p className="text-sm text-center">Thanks for your order - it's now confirmed.</p>
                </div>
                <div className="flex flex-col mt-5 bg-white rounded-md p-4">
                    <div className="mb-2 mt-1">
                        <h1 className="text-md font-semibold">Payment Details</h1>
                    </div>  
                    <div className="flex flex-col mt-3 gap-2">
                        <div className="flex flex-wrap justify-between items-center w-full text-[15px] md:text-base">
                            <p className="text-gray-600">Transaction ID</p>
                            <p className="">{publicId}</p>
                        </div>
                        <div className="flex flex-wrap justify-between items-center w-full text-[15px] md:text-base">
                            <p className="text-gray-600">Transaction Date</p>
                            <p className="">{FormatDateWithoutWib(data.createdAt)}</p>
                        </div>
                        <div className="flex flex-wrap justify-between items-center w-full text-[15px] md:text-base">
                            <p className="text-gray-600">Payment Method</p>
                            <p className="">QRIS</p>
                        </div>
                        <div className="flex flex-wrap justify-between items-center w-full text-[15px] md:text-base">
                            <p className="text-gray-600">Nominal</p>
                            <p className="font-semibold">Rp{totalAmount.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="flex flex-wrap justify-between items-center w-full text-[15px] md:text-base">
                            <p className="text-gray-600">Status</p>
                            <div className="flex flex-wrap gap-1.5 items-center text-[#57D24E]">
                                <CircleCheckBig size={18} />
                                <p className="font-semibold">Success</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                    <Button variant="outlinePrimary" size="lg"
                    onClick={() => navigate('/')}
                    >
                        Back to Home
                    </Button>
                    <Button variant="primary" size="lg"
                    onClick={() => navigate(`/customer/order/${publicId}`)}
                    >
                        View Order
                    </Button>
                </div>
            </div>
        </div>
    )
}