import { TableWithoutPage } from "@/components/common/TableWithoutPage"
import { CapitalizeText } from "@/helper/CapitalizeText"
import { RecentOrder } from "@/types/Transaction"
import { FormatDateWithoutWib } from "@/utils/FormatDate"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

interface RecentOrdersProps {
    recentOrders: RecentOrder[]
    isLoading?: boolean
}

export const RecentOrders = ({
    recentOrders,
    isLoading
}: RecentOrdersProps) => {
    const statusStyle: Record<string, { label: string; className: string }> = {
        pending: {
            label: 'Pending',
            className: 'text-orange-500'
        },
        processing: {
            label: 'Processing',
            className: 'text-sky-600'
        },
        shipped: {
            label: 'Shipped',
            className: 'text-purple-600'
        },
        completed: {
            label: 'Completed',
            className: 'text-green-600'
        },
        expired: {
            label: 'Expired',
            className: 'text-red-600'
        },
    }

    const getSyleStatus = (status: string) => {
        const rawStatus = status.toLocaleLowerCase();
        return statusStyle[rawStatus] || {
            label: status,
            className: 'text-gray-600'
        }
    }

    const columns: ColumnDef<RecentOrder>[] = useMemo(() => [
        {
            accessorKey: "name",
            header: "Customer",
            cell: ({ row }) => {
                const user = row.original;

                return (
                    <span className="truncate max-w-36">{user.customer.name}</span>
                )
            },
        },
        {
            accessorKey: "orderId",
            header: "OrderId",
            cell: ({ row }) => 
                <span className="truncate max-w-36">{row.original.publicId}</span>
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: ({ row }) => 
                <span className="truncate max-w-36">
                    Rp{row.original.totalAmount.toLocaleString("id-ID")}
                </span>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = getSyleStatus(row.original.status)

                return (
                    <div className={`flex justify-center py-0.5 rounded-full items-center text-sm gap-2 font-semibold ${status.className}`}>
                        <p>{CapitalizeText(row.original.status)}</p>
                    </div>
                )
            }
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ row }) => 
                <p>{FormatDateWithoutWib(row.original.createdAt)}</p>
        },
    ], [])

    return (
        <TableWithoutPage
            columns={columns}
            data={recentOrders}
            isLoading={isLoading}
        />
    )
}