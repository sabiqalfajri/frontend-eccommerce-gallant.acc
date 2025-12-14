import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react"
import { 
    OrderStepProgress, 
    OrderTimeline
} from "@/components/user/account/OrderTimeline";
import { Button } from "@/components/ui/button";
import { useToken } from "@/hooks/universal/useToken";
import { useDetailOrderUser } from "@/hooks/transaction/useDetailOrderUser";
import { BuildSteps } from "@/utils/BuildSteps";
import { CapitalizeText } from "@/helper/CapitalizeText";
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";
import { OrderDetailSkeleton } from "@/components/user/account/OrderDetailSkeleton";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { ClipLoader } from "react-spinners";
import { showError } from "@/utils/Toast";
import { useEffect } from "react";

export const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useToken();
    const { addToCart, loadingId } = useAddToCart(token!)
    const { 
        detailOrderUser, 
        isLoadingDetailOrderUser, 
        isFetchedDetailOrderUser,
        isErrorDetailOrderUser
    } = useDetailOrderUser(token!, id!);
    const isLoading = isLoadingDetailOrderUser || !isFetchedDetailOrderUser;
    const smoothLoading = useSmoothLoading(isLoading, 200);
    
    const steps = detailOrderUser 
        ? BuildSteps(detailOrderUser.status, detailOrderUser)
        : []

    useEffect(() => {
        if(smoothLoading) return
        if(isErrorDetailOrderUser || !detailOrderUser) {
            showError("Detail pesanan tidak ditemukan.")
            navigate('/customer/order/all', { replace: true });
            return;
        }
    }, [isErrorDetailOrderUser, detailOrderUser, smoothLoading, navigate])

    return (
        <>
            {smoothLoading ? (
                <OrderDetailSkeleton />
            ) : detailOrderUser && (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-center gap-3">
                        <button className="flex justify-center items-center border border-gray-200 rounded-md w-8 h-8 cursor-pointer hover:bg-gray-100"
                        onClick={() => navigate('/customer/order/all')}
                        >
                            <ArrowLeftIcon size={20} />
                        </button>
                        <h1>Order ID <span className="font-bold">#{id}</span></h1>
                    </div>
                    <div className="flex flex-wrap justify-start md:justify-center items-center border border-gray-200 rounded-md py-4 px-3.5">
                        {/* Timeline for mobile */}
                        <OrderTimeline steps={steps} />
                        {/* Timeline for desktop */}
                        <OrderStepProgress steps={steps} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[62%_1fr] gap-5">
                        <div className="flex flex-col border border-gray-200 rounded-md py-3 px-3.5 h-fit">
                            {detailOrderUser?.items.map((item, idx) => (
                                <div 
                                key={item.id}
                                className={`flex flex-col gap-3 ${idx !== (detailOrderUser.items.length -1) && 'border-b border-gray-300'} py-3.5`}>
                                    <div className="grid grid-cols-[20%_1fr] gap-2">
                                        <img 
                                        src={item.image} 
                                        className="w-20 h-20 rounded-md object-cover" alt="" 
                                        /> 
                                        <div className="text-sm flex flex-col gap-1">
                                            <p className="line-clamp-2">
                                                {item.name}
                                            </p>
                                            <p className="font-semibold">
                                                {item.quantity} x Rp{item.price.toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center">
                                        <Button 
                                        variant="primary" 
                                        className="w-24"
                                        onClick={() => addToCart({ 
                                            productId: item.productId, quantity: 1 
                                        })}
                                        >
                                            {loadingId === item.productId ? (
                                                <ClipLoader size={24} color="white" />
                                            ) : 'Beli lagi'}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3 border border-gray-200 rounded-md py-3 px-3.5 h-fit">
                            <div>
                                <h1 className="font-semibold text-[15px]">
                                    Alamat Pengiriman
                                </h1>
                                <div className="flex flex-col gap-1 mt-2.5 text-sm">
                                    <p>{detailOrderUser?.shippingName}</p>
                                    <p>
                                        {detailOrderUser?.shippingStreet}, {""}
                                        {detailOrderUser?.shippingDistrict}, {""}
                                        {CapitalizeText(detailOrderUser?.shippingCity)}, {""}
                                        {CapitalizeText(detailOrderUser?.shippingProvince)}
                                    </p>
                                    <p>Indonesia</p>
                                    <p>{detailOrderUser?.shippingPhone}</p>
                                </div>
                            </div>
                            <div>
                                <h1 className="font-semibold text-[15px]">
                                    Rincian Pembayaran
                                </h1>
                                <div className="flex flex-col gap-1 mt-2.5 text-sm">
                                    <div className="flex flex-wrap justify-between items-center">
                                        <p>Subtotal (2 items)</p>
                                        <p>
                                            Rp{detailOrderUser?.totalAmount.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap justify-between items-center">
                                        <p>Biaya Pengiriman</p>
                                        <p>Free</p>
                                    </div>
                                    <div className="flex flex-wrap justify-between items-center">
                                        <p>Biaya Layanan</p>
                                        <p>Free</p>
                                    </div>
                                    <div className="bg-gray-300 w-full h-px my-1"></div>
                                    <div className="flex flex-wrap justify-between items-center font-semibold">
                                        <p>Total</p>
                                        <p>
                                            Rp{detailOrderUser?.totalAmount.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}