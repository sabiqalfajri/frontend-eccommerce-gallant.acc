import { ColumnDef } from "@tanstack/react-table";
import { DropdownCustom } from "@/components/common/DropdownCustom";
import { DataTable } from "@/components/common/TableDashboard"
import { Checkbox } from "@/components/ui/checkbox";
import { CapitalizeText } from "@/helper/CapitalizeText";
import { useToken } from "@/hooks/universal/useToken";
import { useMemo, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { filterProduct, Product } from "@/types/Product";
import { useProductsAdmin } from "@/hooks/product/useProductsAdmin";

export const OrdersTable = () => {
    const [filter, setFilter] = useState<filterProduct | string>('ALL');
    const [page, setPage] = useState(1)
    const { token } = useToken();
    const { products, isLoading, totalPages, total } = useProductsAdmin(token!, filter, page, 10);
    // const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    // const [showModal, setShowModal] = useState(false);

    const columns: ColumnDef<Product>[] = useMemo(() => [
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
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const product = row.original;

                return (
                    <div className="flex items-center gap-x-3 w-full">
                        <img 
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-14 h-14 object-cover rounded-md border-[1.5px] border-gray-200"
                        />
                        <span className="truncate max-w-76">{product.name}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => 
            <div>
                {row.getValue("price")}
            </div>,
        },
        {
            accessorKey: "stock",
            header: "Stock",
            cell: ({ row }) => <span>{row.getValue("stock")}</span>,
        },
        {
            accessorKey: "categoryName",
            header: "Category",
            cell: ({ row }) => <span>{row.getValue("categoryName")}</span>,
        },
        {
            accessorKey: "visibility",
            header: "Visibility",
            cell: ({ row }) => {
                const visibility = row.getValue("visibility") as string;
                const colorClasses = visibility === 'PUBLISH'
                    ? 'bg-green-100 text-green-800'
                    : visibility === 'HIDDEN'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800';
                return (
                    <div className={`rounded-full font-semibold py-1 px-1.5 text-center ${colorClasses}`}>
                        <span className="text-sm">
                            {CapitalizeText(row.getValue("visibility"))}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => {
                const menu = [
                    { 
                        icon: <FiEdit size={18} />, 
                        label: 'Update', 
                        href: `/dashboard/update-product/${row.original.id}`
                    },
                    { 
                        icon: <HiOutlineTrash size={19} />, 
                        label: 'Delete', 
                        onClick: () => {
                            // setSelectedOrderId(row.original.id)
                            // setShowModal(true)
                            console.log('modal delete order diklk')
                        }
                    },
                ];

                return (
                    <DropdownCustom
                        // trigger={triggerButton}
                        align="end"
                        menu={menu}
                        className="w-32"
                    />
                )
            },
        },
    ], [])

    const filteredProducts = filter === 'ALL' ? products : products.filter(product => product.visibility === filter);
    console.log('token anda:', token);

    return (
        <DataTable
        title="Order Summary"
        columns={columns} 
        data={filteredProducts}  
        totalRows={total}
        filterButtons={[
            { label: 'All', value: 'ALL' },
            { label: 'Pending', value: 'PUBLISH' },
            { label: 'Processing', value: 'HIDDEN' },
            { label: 'Shipped', value: 'DRAFT' },
            { label: 'Completed', value: 'DRAFT' },
        ]}
        onFilterChange={(value) => setFilter(value)}
        currentFilter={filter}
        // onClick={() => navigate('/dashboard/add-product')}
        // onDeleted={handleDeleteBulk}
        // isDeleting={isDeletingBulk}
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        isLoading={isLoading}
        />
    )
}