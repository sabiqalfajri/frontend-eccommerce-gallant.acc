import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"

export const OrderDetail = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
                <button className="flex justify-center items-center border border-gray-200 rounded-md w-8 h-8 cursor-pointer hover:bg-gray-100"
                onClick={() => navigate('/customer/order/all')}
                >
                    <IoIosArrowBack size={20} />
                </button>
                <h1 className="font-semibold">Order Detail</h1>
            </div>
        </div>
    )
}