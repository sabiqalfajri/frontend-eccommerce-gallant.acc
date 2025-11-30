import { IoIosArrowBack } from "react-icons/io"
import { useNavigate, useParams } from "react-router-dom"
import { PiNotepad } from "react-icons/pi";
import { BsTelephone } from "react-icons/bs";
import { CalendarDays } from 'lucide-react';
import { IoMailOutline } from "react-icons/io5";
import { useEffect, useMemo } from "react";
import { useToken } from "@/hooks/universal/useToken";
import { useDetailOrderAdmin } from "@/hooks/transaction/useDetailOrderAdmin";
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";
import { FormatDate } from "@/utils/FormatDate";
import { CapitalizeText } from "@/helper/CapitalizeText";
import { ColumnDef } from "@tanstack/react-table";
import { BaseItem } from "@/types/Transaction";
import { TableWithoutPage } from "@/components/common/TableWithoutPage";
import { OrderStatusBadge } from "@/components/admin/orders/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { useUpdateStatusOrderAdmin } from "@/hooks/transaction/useUpdateStatusOrderAdmin";
import { ClipLoader } from "react-spinners";
import { showInfo } from "@/utils/Toast";
import { OrderDetailDashboardSkeleton } from "@/components/admin/orders/OrderDetailDashboardSkeleton";

export const OrderDetailDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useToken();
    const { 
        detailOrderAdmin,
        isLoadingDetailOrderAdmin,
        isFetchedDetailOrderAdmin,
        isErrorDetailOrderAdmin
    } = useDetailOrderAdmin(token!, id!);
    const { 
        updateOrderStatusAdmin, 
        isUpdatingOrderStatusAdmin 
    } = useUpdateStatusOrderAdmin(token)

    // if(isErrorDetailOrderAdmin) navigate('/customer/orders');

    const isLoading = isLoadingDetailOrderAdmin || !isFetchedDetailOrderAdmin;
    const smoothLoading = useSmoothLoading(isLoading, 200);

    useEffect(() => {
        if(isErrorDetailOrderAdmin) navigate('/dashboard/orders')
    }, [isErrorDetailOrderAdmin])

    const paymenSummary = [
        {
            label: `Subtotal (${detailOrderAdmin?.items.length} item)`,
            value: `Rp${detailOrderAdmin?.totalAmount.toLocaleString("id-ID")}`
        },
        {
            label: 'Shipping (Free)',
            value: 'Rp0'
        },
        {
            label: 'Tax',
            value: 'Rp0'
        },
        {
            label: 'Total',
            value: `Rp${detailOrderAdmin?.totalAmount.toLocaleString("id-ID")}`
        },
    ]

    const columns: ColumnDef<BaseItem>[] = useMemo(() => [
        {
            accessorKey: "items",
            header: "Items",
            cell: ({ row }) => {
                const user = row.original;

                return (
                    <div className="flex items-center gap-3 py-1.5">
                        <img src={user.image} className="w-16 h-16 object-cover" alt="" />
                        <div className="min-w-0 flex-1">
                            <p className="text-ellipsis line-clamp-2 wrap-break-word">
                                {user.name}
                            </p>
                        </div>
                    </div>
                )
            },
            meta: {
                className: "whitespace-normal"
            }
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => 
                <span>Rp{row.original.price.toLocaleString("id-ID")}</span>
        },
        {
            accessorKey: "qty",
            header: "Qty",
            cell: ({ row }) => 
                <span>
                    {row.original.quantity}
                </span>
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: ({ row }) => 
                <span>
                    Rp{(row.original.quantity * row.original.price).toLocaleString("id-ID")}
                </span>
        },
    ], [])

    const markButtonStyle = (status: string) => {
        switch(status) {
            case 'PROCESSING':
                return 'Mark as Shipped';
            case 'SHIPPED':
                return 'Mark as Completed';
            default:
                return '';
        }
    }

    const showMarkButton = detailOrderAdmin && (
        detailOrderAdmin.status === 'PROCESSING' ||
        detailOrderAdmin.status === 'SHIPPED'
    );
    
    const handleTriggerMark = async (orderId: string, status: string) => {
        if (!orderId) return;
        await updateOrderStatusAdmin({ orderId, newStatus: status });
        showInfo(`Order marked as ${status.toLowerCase()}`)
    }

    return (
        <>
            {smoothLoading ? (
                <OrderDetailDashboardSkeleton />
            ) : detailOrderAdmin && (
                <div className="flex flex-col gap-y-6">
                    <div className="flex flex-wrap justify-between gap-3 items-center">
                        <div className="flex flex-wrap items-center gap-x-3">
                            <button 
                            type="button"
                            className="flex justify-center items-center rounded-md w-8 h-8 border border-gray-300 cursor-pointer hover:bg-gray-200 transform transition-all duration-200"
                            onClick={() => navigate('/dashboard/orders')}
                            >
                                <IoIosArrowBack size={22} />
                            </button>
                            <h1>Order ID <span className="font-bold">#{id}</span></h1>
                        </div>
                        {showMarkButton && (
                            <div className="flex justify-end items-center w-full md:w-fit">
                                <Button
                                    className="w-[9.6rem]"
                                    disabled={isUpdatingOrderStatusAdmin}
                                    onClick={() => 
                                        handleTriggerMark(
                                            detailOrderAdmin.id,
                                            detailOrderAdmin.status === 'PROCESSING'
                                            ? 'SHIPPED'
                                            : "COMPLETED"
                                        )
                                    }
                                >
                                    {isUpdatingOrderStatusAdmin 
                                        ? <ClipLoader size={24} color="white" />
                                        : markButtonStyle(detailOrderAdmin.status)
                                    }
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3.5">
                        <div className="flex flex-wrap items-center gap-3 md:gap-4">
                            <OrderStatusBadge 
                                status={detailOrderAdmin.status} 
                                className="rounded-md py-1 px-1.5" 
                            />
                            <div className="bg-gray-400 w-[1.2px] h-5"></div>
                            <div className="flex flex-wrap gap-x-1.5 items-center text-gray-500">
                                <CalendarDays size={19} />
                                <p className="font-semibold text-[15px] md:text-base">
                                    {FormatDate(detailOrderAdmin.createdAt)}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[65%_1fr] gap-6">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col bg-white rounded-md px-4 pt-4 pb-5">
                                    <TableWithoutPage
                                        columns={columns}
                                        data={detailOrderAdmin.items}
                                        isLoading={isLoading}
                                    />
                                </div>
                                <div className="bg-white rounded-md px-4 pt-4 pb-5">
                                    <h1 className="font-semibold text-base">Payment Summary</h1>
                                    <div className="flex flex-col gap-1 mt-4">
                                        {paymenSummary.map(item => (
                                            <div className={`flex flex-wrap justify-between items-center text-[15px] ${item.label === 'Tax' && 'border-b border-gray-200 pb-1.5'} ${item.label === 'Total' && 'pt-1.5 font-semibold'}`}>
                                                <h1 className="text-gray-700">{item.label}</h1>
                                                <p>{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-md px-4 pt-4 pb-5 gap-3 h-fit">
                                <h1 className="font-semibold text-base">Customer</h1>
                                <div className="flex flex-col">
                                    <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 py-4">
                                        <div className="w-9 h-9">
                                            <img src={detailOrderAdmin.customer.image} alt="" 
                                            className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                        <h1>{detailOrderAdmin.shippingName}</h1>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 py-4">
                                        <div className="w-9 flex justify-center">
                                            <PiNotepad size={22} />
                                        </div>
                                        <h1>{detailOrderAdmin.items.length} Orders</h1>
                                    </div>
                                    <div className="flex flex-col gap-3.5 border-b border-gray-200 py-4">
                                        <h1 className="font-semibold">Contact Info</h1>
                                        <div className="flex flex-col gap-2 text-[15px]">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <IoMailOutline size={21} />
                                                <p>{detailOrderAdmin.customer.email}</p>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <BsTelephone size={18} />
                                                <p>{detailOrderAdmin.shippingPhone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3.5 pt-4 pb-2">
                                        <h1 className="font-semibold">Shipping Address</h1>
                                        <div className="flex flex-col gap-0.5 text-[15px]">
                                            <p>
                                                {detailOrderAdmin.shippingStreet}, {""}
                                                {detailOrderAdmin.shippingDistrict}, {""}
                                                {CapitalizeText(detailOrderAdmin.shippingCity)}, {""}
                                                {CapitalizeText(detailOrderAdmin.shippingProvince)} {""} {detailOrderAdmin.shippingPostalCode}
                                            </p>
                                            <p>Indonesia</p>
                                        </div>
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