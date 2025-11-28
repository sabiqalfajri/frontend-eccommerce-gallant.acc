import { getOrderDashboardActions } from "@/components/admin/OrderActions";
import { DropdownCustom } from "@/components/common/DropdownCustom";
import { ModalConfirm } from "@/components/common/ModalDelete";
import { DataTable } from "@/components/common/TableDashboard";
import { Checkbox } from "@/components/ui/checkbox";
import { CapitalizeText } from "@/helper/CapitalizeText";
import { useTransactionOrderAdmin } from "@/hooks/transaction/useTransactionOrderAdmin";
import { useUpdateStatusOrderAdmin } from "@/hooks/transaction/useUpdateStatusOrderAdmin";
import { useToken } from "@/hooks/universal/useToken";
import { BaseTransactionOrderPaginated, statusOrder } from "@/types/Transaction";
import { FormatDateWithoutWib } from "@/utils/FormatDate";
import { showInfo } from "@/utils/Toast";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { IoIosMore } from "react-icons/io";

export const OrdersDashboard = () => {
    const [filter, setFilter] = useState<statusOrder | string>('ALL');
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [newStatus, setNewStatus] = useState<string | null>(null)
    const { token } = useToken();
    const { updateOrderStatusAdmin, isUpdatingOrderStatusAdmin } = useUpdateStatusOrderAdmin(token)
    const { orders, isLoading, isFetched, totalPages, total } = useTransactionOrderAdmin(token!, filter, page, 10)
    const loadingOrders = isLoading || !isFetched;

    const triggerButton = (
        <button className="flex items-center justify-center hover:bg-gray-100 rounded-full p-1.5 cursor-pointer">
            <IoIosMore size={23} />
        </button>
    )

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
        setSelectedOrderId(orderId);
        setNewStatus(status)
        setShowModal(true);
    }

    const columns: ColumnDef<BaseTransactionOrderPaginated>[] = useMemo(() => [
        {
            id: "select",
            header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                className="size-[17px]!"
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
            ),
            cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                className="size-[17px]!"
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "customer",
            header: "Customer",
            cell: ({ row }) => {
                const order = row.original;

                return (
                    <div className="flex items-center gap-x-3 w-full">
                        <div className="w-11 h-11">
                            <img 
                                src={order.customer.image}
                                alt={order.customer.name}
                                className="w-full h-full object-cover rounded-full border-[1.5px] border-gray-200"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="truncate max-w-48 font-semibold">
                                {order.customer.name}
                            </span>
                            <span className="truncate max-w-48 text-[13px] text-gray-600">
                                {order.customer.email}
                            </span>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "orderId",
            header: "OrderId",
            cell: ({ row }) => 
            <div>
                <p>{row.original.publicId}</p>
            </div>
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: ({ row }) => 
            <div>
                <p>Rp{row.original.totalAmount.toLocaleString("id-ID")}</p>
            </div>
        },
        {
            accessorKey: "items",
            header: "Items",
            cell: ({ row }) => 
            <div>
                <p>{row.original.items.length} Item</p>
            </div>
        },
        {
            accessorKey: "payment",
            header: "Payment",
            cell: ({ row }) => 
            <div>
                <p>{row.original.paymentType}</p>
            </div>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = getSyleStatus(row.original.status);

                return (
                    <div className={`w-28 rounded-full font-semibold py-1 px-1.5 text-center ${status.className}`}>
                        <span className="text-sm">
                            {CapitalizeText(row.original.status)}
                        </span>
                    </div>
                )
            }
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ row }) => 
            <div>
                <p>{FormatDateWithoutWib(row.original.createdAt)}</p>
            </div>,
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => {
                const order = row.original;
                const menu = getOrderDashboardActions(order, {
                    updateStatus: handleUpdateStatus
                })

                return (
                    <DropdownCustom
                        trigger={triggerButton}
                        align="end"
                        menu={menu}
                        className="min-w-48"
                    />
                )
            }
        },
    ], [handleUpdateStatus]);

    const filteredOrders = filter === 'ALL' ? orders : orders.filter(order => order.status === filter);

    return (
        <>
            <DataTable 
                title="Order Summary"
                columns={columns} 
                data={filteredOrders}  
                totalRows={total}
                filterButtons={[
                    { label: 'All', value: 'ALL' },
                    { label: 'Processing', value: 'PROCESSING' },
                    { label: 'Shipped', value: 'SHIPPED' },
                    { label: 'Completed', value: 'COMPLETED' },
                ]}
                onFilterChange={(value) => setFilter(value)}
                currentFilter={filter}
                // onClick={() => console.log('hai')}
                // onDeleted={handleDeleteBulk}
                // isDeleting={isDeletingBulk}
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
                isLoading={loadingOrders}
            />
            {/* Modal Shipped Confirmation */}
            <ModalConfirm
                isOpen={showModal}
                onCancel={() => setShowModal(false)}
                onConfirm={async() => {
                    if(!selectedOrderId || !newStatus) return;
                    await updateOrderStatusAdmin({ orderId: selectedOrderId, newStatus });
                    setShowModal(false)
                    showInfo('The order has been successfully marked as shipped.')
                }}
                variant="SHIPPED"
                confirmLabel="Ship Order"
                isLoading={isUpdatingOrderStatusAdmin}
                title="Mark as Shipped"
                description={`Are you sure you want to mark this order as shipped?. This action cannot be undone`}
                size="sm"
            />
        </>
    )
}