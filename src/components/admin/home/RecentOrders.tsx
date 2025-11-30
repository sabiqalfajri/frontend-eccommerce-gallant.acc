import { TableWithoutPage } from "@/components/common/TableWithoutPage"
import { RecentOrder } from "@/types/Transaction"
import { FormatDateWithoutWib } from "@/utils/FormatDate"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { OrderStatusBadge } from "../orders/OrderStatusBadge"

interface RecentOrdersProps {
    recentOrders: RecentOrder[]
    isLoading?: boolean
}

export const RecentOrders = ({
    recentOrders,
    isLoading
}: RecentOrdersProps) => {
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