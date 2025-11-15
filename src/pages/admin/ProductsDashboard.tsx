import { DataTable } from "@/components/common/TableDashboard";
import { useProductsAdmin } from "@/hooks/product/useProductsAdmin";
import { useToken } from "@/hooks/universal/useToken";
import { filterProduct, Product } from "@/types/Product";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownCustom } from "@/components/common/DropdownCustom";
import { HiOutlineTrash } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDeletedProduct } from "@/hooks/product/useDeletedProduct";
import { ModalConfirm } from "@/components/common/ModalDelete";
import { CapitalizeText } from "@/helper/CapitalizeText";

export const ProductsDashboard = () => {
    const [filter, setFilter] = useState<filterProduct | string>('ALL');
    const [page, setPage] = useState(1)
    const { token } = useToken();
    const { products, isLoading, rowsPerPage, totalPages, total } = useProductsAdmin(token!, filter, page, 10);
    const [showModal, setShowModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
    const navigate = useNavigate();
    const { 
        deletedProductBulk, 
        isDeletingBulk, 
        deletedProductSingle, 
        isDeletingSingle 
    } = useDeletedProduct(token!)

    const triggerButton = (
        <button className="flex items-center justify-center hover:bg-gray-100 rounded-full p-1.5 cursor-pointer">
            <IoIosMore size={23} />
        </button>
    )

    const handleDeleteSingle = async () => {
        if(!selectedProductId) return;
        await deletedProductSingle(selectedProductId);
        setShowModal(false)
    }

    const handleDeleteBulk = async (ids: string[]) => {
        await deletedProductBulk(ids)
    }

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
                            setSelectedProductId(row.original.id)
                            setShowModal(true)
                        }
                    },
                ];

                return (
                    <DropdownCustom
                        trigger={triggerButton}
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
        <>
            <DataTable 
            title="Product List"
            columns={columns} 
            data={filteredProducts}  
            totalRows={total}
            filterButtons={[
                { label: 'All', value: 'ALL' },
                { label: 'Published', value: 'PUBLISH' },
                { label: 'Hidden', value: 'HIDDEN' },
                { label: 'Draft', value: 'DRAFT' },
            ]}
            onFilterChange={(value) => setFilter(value)}
            currentFilter={filter}
            onClick={() => navigate('/dashboard/add-product')}
            onDeleted={handleDeleteBulk}
            isDeleting={isDeletingBulk}
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
            isLoading={isLoading}
            />

            {/* Modal Delete Single */}
            <ModalConfirm
                isOpen={showModal}
                onCancel={() => setShowModal(false)}
                onConfirm={handleDeleteSingle}
                isLoading={isDeletingSingle}
                title="Delete"
                description={`Are you sure you want to delete this product?. This action cannot be undone`}
                size="sm"
            />
        </>
    )
}