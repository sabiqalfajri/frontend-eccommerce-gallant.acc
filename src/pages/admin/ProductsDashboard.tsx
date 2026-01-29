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
    const { products, isLoading, totalPages, total } = useProductsAdmin(token!, filter, page, 10);
    const [showModal, setShowModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
    const navigate = useNavigate();
    const { 
        deletedProductBulk, 
        isDeletingBulk, 
        deletedProductSingle, 
        isDeletingSingle 
    } = useDeletedProduct(token!)

    

    const handleDeleteSingle = async () => {
        if(!selectedProductId) return;
        await deletedProductSingle(selectedProductId);
        setShowModal(false)
    }

    const handleDeleteBulk = async (ids: string[]) => {
        await deletedProductBulk(ids)
    }

    const columns: ColumnDef<Product>[] = useMemo(() => {
        const triggerButton = (
            <button className="flex items-center justify-center hover:bg-gray-100 rounded-full p-1.5 cursor-pointer">
                <IoIosMore size={23} />
            </button>
        )

        return [
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
                header: "Nama Produk",
                cell: ({ row }) => {
                    const product = row.original;

                    return (
                        <div className="flex items-center gap-x-3">
                            <img 
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-14 h-14 object-cover rounded-md border-[1.5px] border-gray-200"
                            />
                            <span className="line-clamp-2 w-76">{product.name}</span>
                        </div>
                    )
                },
                meta: {
                    className: "whitespace-normal"
                }
            },
            {
                accessorKey: "price",
                header: "Harga",
                cell: ({ row }) => 
                <div>
                    <p>Rp{(row.original.price).toLocaleString("id-ID")}</p>
                </div>,
            },
            {
                accessorKey: "stock",
                header: "Stok",
                cell: ({ row }) => <span>{row.getValue("stock")}</span>,
            },
            {
                accessorKey: "categoryName",
                header: "Kategori",
                cell: ({ row }) => <span>{row.getValue("categoryName")}</span>,
            },
            {
                accessorKey: "visibility",
                header: "Visibilitas",
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
                header: "Aksi",
                cell: ({ row }) => {
                    const menu = [
                        { 
                            icon: <FiEdit size={18} />, 
                            label: 'Edit Produk', 
                            href: `/dashboard/update-product/${row.original.id}`
                        },
                        { 
                            icon: <HiOutlineTrash size={19} />, 
                            label: 'Hapus Produk', 
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
                            className="w-44"
                        />
                    )
                },
            },
        ]
    }, [])

    const filteredProducts = filter === 'ALL' ? products : products.filter(product => product.visibility === filter);
    console.log('token anda:', token);

    return (
        <>
            <DataTable 
            title="Daftar Produk"
            columns={columns} 
            data={filteredProducts}  
            totalRows={total}
            filterButtons={[
                { label: 'Semua', value: 'ALL' },
                { label: 'Dipublikasikan', value: 'PUBLISH' },
                { label: 'Disembunyikan', value: 'HIDDEN' },
                { label: 'Draf', value: 'DRAFT' },
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
                variant="DELETE"
                confirmLabel="Hapus"
                title="Hapus"
                description={`Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.`}
                size="sm"
            />
        </>
    )
}