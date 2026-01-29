import { getOrderDashboardActions } from "@/components/admin/OrderActions";
import { ModalConfig } from "@/components/admin/orders/ModalConfig";
import { OrderStatusBadge } from "@/components/admin/orders/OrderStatusBadge";
import { DropdownCustom } from "@/components/common/DropdownCustom";
import { ModalConfirm, Variant } from "@/components/common/ModalDelete";
import { DataTable } from "@/components/common/TableDashboard";
import { useTransactionOrderAdmin } from "@/hooks/transaction/useTransactionOrderAdmin";
import { useUpdateStatusOrderAdmin } from "@/hooks/transaction/useUpdateStatusOrderAdmin";
import { useToken } from "@/hooks/universal/useToken";
import { BaseTransactionOrderPaginated, statusOrder } from "@/types/Transaction";
import { FormatDateWithoutWib } from "@/utils/FormatDate";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { IoIosMore } from "react-icons/io";

export const OrdersDashboard = () => {
    const [filter, setFilter] = useState<statusOrder | string>('ALL');
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false);
    const [modalState, setModalState] = useState<{
        variant: Variant;
        title: string;
        confirmLabel: string;
        description: string;
    } | null>(null);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [newStatus, setNewStatus] = useState<statusOrder | null>(null)
    const { token } = useToken();
    const { updateOrderStatusAdmin, isUpdatingOrderStatusAdmin } = useUpdateStatusOrderAdmin(token)
    const { orders, isLoading, isFetched, totalPages, total } = useTransactionOrderAdmin(token!, filter, page, 10)
    const loadingOrders = isLoading || !isFetched;

    const handleUpdateStatus = async (orderId: string, status: statusOrder) => {
        setSelectedOrderId(orderId);
        setNewStatus(status);
        setModalState(ModalConfig[status])
        setShowModal(true);
    }

    const columns: ColumnDef<BaseTransactionOrderPaginated>[] = useMemo(() => {
        const triggerButton = (
            <button className="flex items-center justify-center hover:bg-gray-100 rounded-full p-1.5 cursor-pointer">
                <IoIosMore size={23} />
            </button>
        )

        return [
            {
                accessorKey: "customer",
                header: "Pelanggan",
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
                header: "ID Pesanan",
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
                header: "Item",
                cell: ({ row }) => 
                <div>
                    <p>{row.original.items.length} Item</p>
                </div>
            },
            {
                accessorKey: "payment",
                header: "Pembayaran",
                cell: ({ row }) => 
                <div>
                    <p>{row.original.paymentType}</p>
                </div>,
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.original.status

                    return (
                        <OrderStatusBadge
                            status={status} 
                            className="rounded-full py-1 px-1.5" 
                        />
                    )
                }
            },
            {
                accessorKey: "date",
                header: "Tanggal",
                cell: ({ row }) => 
                <div>
                    <p>{FormatDateWithoutWib(row.original.createdAt)}</p>
                </div>,
            },
            {
                accessorKey: "action",
                header: "Aksi",
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
        ]
    }, [])

    const filteredOrders = filter === 'ALL' ? orders : orders.filter(order => order.status === filter);

    return (
        <>
            <DataTable 
                title="Daftar Pesanan"
                columns={columns} 
                data={filteredOrders}  
                totalRows={total}
                filterButtons={[
                    { label: 'Semua', value: 'ALL' },
                    { label: 'Diproses', value: 'PROCESSING' },
                    { label: 'Dikirim', value: 'SHIPPED' },
                    { label: 'Selesai', value: 'COMPLETED' },
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
            {/* Modal Mark Confirmation */}
            {showModal && modalState && (
                <ModalConfirm
                    isOpen={showModal}
                    onCancel={() => setShowModal(false)}
                    onConfirm={async() => {
                        if(!selectedOrderId || !newStatus) return;
                        await updateOrderStatusAdmin({ orderId: selectedOrderId, newStatus });
                        setShowModal(false)
                    }}
                    variant={modalState.variant}
                    confirmLabel={modalState.confirmLabel}
                    isLoading={isUpdatingOrderStatusAdmin}
                    title={modalState.title}
                    description={modalState.description}
                    size="sm"
                />
            )}
        </>
    )
}