import { TransactionResponse } from "@/types/Transaction"
import { FormatDate } from "@/utils/FormatDate"
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
        <div className="flex justify-center items-center h-[calc(100vh-25vh)] md:h-fit">
            <div className="flex flex-col w-full md:w-[25rem]">
                <div className="flex flex-col items-center">
                    <div>
                        <Lottie 
                            className="w-24 h-24 md:w-32 md:h-32"
                            animationData={completedAnimation}
                            loop
                            autoPlay
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center -mt-2.5">
                        <h1 className="font-semibold text-lg md:text-[20px]">Pembayaran Berhasil!</h1>
                        <p className="text-sm text-center">
                            Terima kasih! Pesanan kamu telah dikonfirmasi.
                        </p>
                        <p className="text-sm text-center mt-2.5">
                            {FormatDate(data.createdAt)}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col mt-8 bg-white rounded-md p-4">
                    <div className="mb-1.5 mt-1">
                        <h1 className="text-md font-semibold">
                            Detail Pembayaran
                        </h1>
                    </div>  
                    <div className="flex flex-col mt-2 gap-1.5">
                        <div className="flex flex-wrap justify-between items-center w-full text-[15px] md:text-base">
                            <p className="text-gray-600">ID Transaksi</p>
                            <p className="">{publicId}</p>
                        </div>
                        <div className="flex flex-wrap justify-between items-center w-full text-[15px] md:text-base">
                            <p className="text-gray-600">Metode Pembayaran</p>
                            <p className="">QRIS</p>
                        </div>
                        <div className="flex flex-wrap justify-between items-center w-full text-[15px] md:text-base">
                            <p className="text-gray-600">Total Pembayaran</p>
                            <p className="font-semibold">Rp{totalAmount.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="flex flex-wrap justify-between items-center w-full text-[15px] md:text-base">
                            <p className="text-gray-600">Status</p>
                            <div className="flex flex-wrap gap-1.5 items-center text-[#57D24E]">
                                <CircleCheckBig size={18} />
                                <p className="font-semibold">Sukses</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                    <Button variant="outlinePrimary" size="lg"
                    onClick={() => navigate('/')}
                    >
                        Belanja Lagi
                    </Button>
                    <Button variant="primary" size="lg"
                    onClick={() => navigate(`/customer/order/${publicId}`)}
                    >
                        Lihat Pesanan
                    </Button>
                </div>
            </div>
        </div>
    )
}