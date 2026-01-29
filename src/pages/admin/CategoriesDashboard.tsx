import { DropdownCustom } from "@/components/common/DropdownCustom"
import { ModalConfirm } from "@/components/common/ModalDelete"
import { DataTable } from "@/components/common/TableDashboard"
import { Checkbox } from "@/components/ui/checkbox"
import { useCategoriesAdmin } from "@/hooks/category/useCategoriesAdmin"
import { useDeletedCategory } from "@/hooks/category/useDeletedCategory"
import { useToken } from "@/hooks/universal/useToken"
import { CategoryAdmin } from "@/types/Category"
import { FormatDateWithoutWib } from "@/utils/FormatDate"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { FiEdit } from "react-icons/fi"
import { HiOutlineTrash } from "react-icons/hi"
import { IoIosMore } from "react-icons/io"
import { useNavigate } from "react-router-dom"

export const CategoryDashboard = () => {
    const [page, setPage] = useState(1);
    const { token } = useToken();
    const {
        categoriesAdmin,
        total,
        totalPages,
        isLoading,
    } = useCategoriesAdmin(token!, page, 10);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { 
            deleteSingleCategory,
            isDeletingSingleCategory,
            deleteBulkCategory,
            isDeletingBulkCategory
        } = useDeletedCategory(token!)

    const handleDeleteSingle = async () => {
        if(!selectedCategoryId) return;
        await deleteSingleCategory(selectedCategoryId);
        setShowModal(false)
    }

    const handleDeleteBulk = async (ids: string[]) => {
        await deleteBulkCategory(ids)
    }

    const columns: ColumnDef<CategoryAdmin>[] = useMemo(() => {
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
                header: "Kategori",
                cell: ({ row }) => {
                    const category = row.original;

                    return (
                        <div className="flex items-center gap-x-3 w-full">
                            <img 
                                src={category.image}
                                alt={category.name}
                                className="w-14 h-14 object-cover rounded-md border-[1.5px] border-gray-200"
                            />
                            <span className="truncate max-w-36">{category.name}</span>
                        </div>
                    )
                },
            },
            {
                accessorKey: "products",
                header: "Total Produk",
                cell: ({ row }) => 
                <p>
                    {row.original.totalProducts ?? 0}
                </p>,
            },
            {
                accessorKey: "createdAt",
                header: "Tgl Dibuat",
                cell: ({ row }) => <span>{FormatDateWithoutWib(row.original.createdAt)}</span>,
            },
            {
                accessorKey: "updatedAt",
                header: "Tgl Diperbarui",
                cell: ({ row }) => <span>{FormatDateWithoutWib(row.original.updatedAt)}</span>,
            },
            {
                accessorKey: "actions",
                header: "Aksi",
                cell: ({ row }) => {
                    const menu = [
                        { 
                            icon: <FiEdit size={18} />, 
                            label: 'Edit Kategori', 
                            href: `/dashboard/update-category/${row.original.id}`
                        },
                        { 
                            icon: <HiOutlineTrash size={19} />, 
                            label: 'Hapus Kategori', 
                            onClick: () => {
                                setSelectedCategoryId(row.original.id)
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

    return (
        <>
            <DataTable
                title="Daftar Kategori"
                columns={columns} 
                data={categoriesAdmin || []}  
                totalRows={total}
                onDeleted={handleDeleteBulk}
                isDeleting={isDeletingBulkCategory}
                onClick={() => navigate('/dashboard/add-category')}
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
                isLoading={isLoading}
            />

            <ModalConfirm
                isOpen={showModal}
                onCancel={() => setShowModal(false)}
                onConfirm={handleDeleteSingle}
                isLoading={isDeletingSingleCategory}
                variant="DELETE"
                confirmLabel="Hapus"
                title="Hapus"
                description={`Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan.`}
                size="sm"
            />
        </>
    )
}