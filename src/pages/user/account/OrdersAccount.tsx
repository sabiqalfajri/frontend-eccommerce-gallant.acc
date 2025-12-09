import { DropdownCustom } from "@/components/common/DropdownCustom";
import { Button } from "@/components/ui/button"
import { OrderEmpty } from "@/components/user/account/OrderEmpty";
import { OrderSkeleton } from "@/components/user/account/OrderSkeleton";
import { getOrderAccountActions } from "@/components/user/OrderAccountActions";
import { useTransactionOrderByUserId } from "@/hooks/transaction/useTransactionByUserId";
import { useUpdateStatusOrderUser } from "@/hooks/transaction/useUpdateStatusOrderUser";
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";
import { useToken } from "@/hooks/universal/useToken";
import { FormatDate } from "@/utils/FormatDate";
import { IoMdMore } from "react-icons/io";
import { Navigate } from "react-router-dom";

export const OrdersAccount = () => {
    const { token } = useToken();
    const { 
        transactionList, 
        isLoadingTransactionList, 
        isFetchedTransactionList,
        isErrorTransactionList
    } = useTransactionOrderByUserId(token!);
    const { updateOrderStatusUser } = useUpdateStatusOrderUser(token);
    const isLoading = isLoadingTransactionList || !isFetchedTransactionList;
    const smoothLoading = useSmoothLoading(isLoading, 200);

    const statusStyle: Record<string, { label: string; className: string }> = {
        pending: {
            label: 'Pending',
            className: 'bg-orange-100 text-orange-600'
        },
        processing: {
            label: 'Processing',
            className: 'bg-sky-100 text-sky-600'
        },
        shipped: {
            label: 'Shipped',
            className: 'bg-purple-100 text-purple-600'
        },
        completed: {
            label: 'Completed',
            className: 'bg-green-100 text-green-600'
        },
        expired: {
            label: 'Expired',
            className: 'bg-red-100 text-red-600'
        },
    }

    const getSyleStatus = (status: string) => {
        const rawStatus = status.toLocaleLowerCase();
        return statusStyle[rawStatus] || {
            label: status,
            className: 'bg-gray-100 text-gray-600'
        }
    }

    const handleUpdateStatus = async (orderId: string, status: string) => {
        await updateOrderStatusUser({ orderId, newStatus: status })
    }

    if (isErrorTransactionList) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    if(!smoothLoading && transactionList.length === 0) {
        return <OrderEmpty />
    }

    return (
        <>
            {smoothLoading ? (
                <OrderSkeleton />
            ) : (
                <div className="flex flex-col gap-4">
                    {transactionList.map((order) => {
                        const status = getSyleStatus(order.status);
                        const invalidDeliveryDate = ["SHIPPED", "COMPLETED"]
                        const menu = getOrderAccountActions(order, {
                            updateStatus: handleUpdateStatus
                        })
                        
                        return (
                            <div 
                            key={order.id}
                            className="flex flex-col gap-3 border border-gray-300 py-3 px-3.5 rounded-md">
                                <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-3">
                                    <div className="flex flex-col">
                                        <h1 className="font-semibold text-[15px]">{order.publicId}</h1>
                                        <div className="flex flex-wrap items-center gap-x-2 text-sm mt-px">
                                            <p>{order.items.length} Product</p>
                                            <div className="w-px h-4 bg-gray-500"></div>
                                            <p>{FormatDate(order.createdAt)}</p>
                                        </div>
                                    </div>
                                    <DropdownCustom
                                        align="end"
                                        menu={menu}
                                        className="min-w-44"
                                    >
                                        <Button 
                                        variant="outline"
                                        type="button"
                                        size="icon"
                                        className="[&>svg]:size-5! h-8 w-8"
                                        >
                                            <IoMdMore size={22} />
                                        </Button>
                                    </DropdownCustom>
                                </div>
                                <div className="flex flex-col gap-2 text-[15px] pb-3 border-b border-gray-200">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <p className="w-30">Status</p>
                                        <div className={`flex justify-center items-center font-semibold py-0.5 text-sm w-24 rounded-full ${status.className}`}>
                                            {status.label}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        <p className="w-30">Date of delivery</p>
                                        <p>
                                            {
                                                invalidDeliveryDate.includes(order.status) 
                                                ? 'Fri, 14 Nov, 2025' 
                                                : '-'
                                            }
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        <p className="w-30">Delivered to</p>
                                        <p>JL Kaliputih 1 No 9</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        <p className="w-30 font-semibold">Total</p>
                                        <p className="font-semibold">
                                            Rp{order.totalAmount.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                </div>   
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-sm">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="grid grid-cols-[24%_1fr] gap-x-3">
                                            <div className="bg-gray-200 h-[4.7rem]">
                                                <img src={item.product.image} className="h-full w-full object-cover" alt="" />
                                            </div>
                                            <div className="flex flex-col">
                                                <h1 className="line-clamp-2">
                                                    {item.product.name}
                                                </h1>
                                                <p className="text-sm mt-0.5 font-semibold">
                                                    {item.quantity} x Rp{item.price.toLocaleString("id-ID")}
                                                </p>
                                            </div>
                                        </div>  
                                    ))}
                                </div>  
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}