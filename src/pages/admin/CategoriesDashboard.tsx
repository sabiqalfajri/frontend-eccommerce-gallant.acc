import { CardDashboard } from "@/components/admin/Card"
import { DropdownCustom } from "@/components/common/DropdownCustom"
import { DataTable } from "@/components/common/TableDashboard"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCategoriesAdmin } from "@/hooks/category/useCategoriesAdmin"
import { useToken } from "@/hooks/universal/useToken"
import { CategoryAdmin } from "@/types/Category"
import { FormatDateWithoutWib } from "@/utils/FormatDate"
import { ColumnDef } from "@tanstack/react-table"
import { ca } from "date-fns/locale"
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
        isFetched,
    } = useCategoriesAdmin(token!, page, 10);
    const navigate = useNavigate();

    const columns: ColumnDef<CategoryAdmin>[] = useMemo(() => [
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
            header: "Products",
            cell: ({ row }) => 
            <p>
                {row.original.totalProducts}
            </p>,
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => <span>{FormatDateWithoutWib(row.original.createdAt)}</span>,
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => <span>{FormatDateWithoutWib(row.original.updatedAt)}</span>,
        },
        {
            accessorKey: "actions",
            header: "Actions",
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
                            // setSelectedProductId(row.original.id)
                            // setShowModal(true)
                        }
                    },
                ];

                return (
                    <DropdownCustom
                        align="end"
                        menu={menu}
                        className="w-32"
                    >
                        <button className="flex items-center justify-center hover:bg-gray-100 rounded-full p-1.5 cursor-pointer">
                            <IoIosMore size={23} />
                        </button>
                    </DropdownCustom>
                )
            },
        },
    ], [])

    return (
        <DataTable
            title="Category List"
            columns={columns} 
            data={categoriesAdmin || []}  
            totalRows={total}
            // onDeleted={handleDeleteBulk}
            // isDeleting={isDeletingBulk}
            onClick={() => navigate('/dashboard/add-product')}
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
            isLoading={isLoading}
        />
        // <div className="flex flex-col gap-y-6">
        //     <div className="flex justify-end items-center">
        //         <Button variant="primary" className="h-10!">
        //             + Add New Item
        //         </Button>
        //     </div>
        //     <CardDashboard title="Category List">
        //         <div></div>
        //     </CardDashboard>
        // </div>
    )
}