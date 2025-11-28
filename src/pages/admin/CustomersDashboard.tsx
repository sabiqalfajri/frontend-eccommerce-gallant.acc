import { DataTable } from "@/components/common/TableDashboard";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useUserAll } from "@/hooks/user/useUserAll";
import { useToken } from "@/hooks/universal/useToken";
import { User } from "@/types/User";
import { IoIosMore } from "react-icons/io";
import { DropdownCustom } from "@/components/common/DropdownCustom";
import { HiOutlineTrash } from "react-icons/hi";
import { useDeletedUser } from "@/hooks/user/useDeleteUser";
import { ModalConfirm } from "@/components/common/ModalDelete";

export const CustomersDashboard = () => {
    const [page, setPage] = useState(1);
    const [selectedCustomerId, setSelectedCustomerId,] = useState<string | null>(null);
    const { token } = useToken();
    const { usersAll, isLoadingUsersAll, totalPages, total } = useUserAll(token!, page, 10)
    const [showModal, setShowModal] = useState(false);
    const { 
        deletedUserSingle,
        isDeletingSingle,
        deletedUserBulk,
        isDeletingBulk
     } = useDeletedUser(token!)

    const triggerButton = (
        <button className="flex items-center justify-center hover:bg-gray-100 rounded-full p-1.5 cursor-pointer">
            <IoIosMore size={23} />
        </button>
    )

    const columns: ColumnDef<User>[] = useMemo(() => [
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
            header: "Customer",
            cell: ({ row }) => {
                const user = row.original;

                return (
                    <div className="flex items-center gap-x-3 w-full">
                        <div className="w-11 h-11">
                            <img 
                                src={user.image}
                                alt={user.name}
                                className="w-full h-full object-cover rounded-full border-[1.5px] border-gray-200"
                            />
                        </div>
                        <span className="truncate max-w-36">{user.name}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => 
            <p>
                {row.getValue("email")}
            </p>,
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => <span>{row.getValue("phone")}</span>,
        },
        {
            accessorKey: "orders",
            header: "Orders",
            cell: ({ row }) => <span>{row.getValue("orders")}</span>,
        },
        {
            accessorKey: "joinedOn",
            header: "Joined On",
            cell: ({ row }) => <span>{row.getValue("joinedOn")}</span>,
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => {
                const menu = [
                    // { 
                    //     icon: <FiEdit size={18} />, 
                    //     label: 'Update', 
                    //     href: `/dashboard/update-product/${row.original.id}`
                    // },
                    { 
                        icon: <HiOutlineTrash size={19} />, 
                        label: 'Delete', 
                        onClick: () => {
                            setSelectedCustomerId(row.original.id)
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

    const handleDeleteSingle = async () => {
        if(!selectedCustomerId) return;
        try {
            await deletedUserSingle(selectedCustomerId);
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setShowModal(false)
        }
    }

    const handleDeleteBulk = async (ids: string[]) => {
        await deletedUserBulk(ids)
    }

    return (
        <>
        <DataTable 
            title="User List"
            columns={columns} 
            data={usersAll || []}  
            totalRows={total}
            onDeleted={handleDeleteBulk}
            isDeleting={isDeletingBulk}
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
            isLoading={isLoadingUsersAll}
        />
            <ModalConfirm
                isOpen={showModal}
                onCancel={() => setShowModal(false)}
                onConfirm={handleDeleteSingle}
                isLoading={isDeletingSingle}
                variant="DELETE"
                confirmLabel="Delete"
                title="Delete"
                description={`Are you sure you want to delete this user?. This action cannot be undone`}
                size="sm"
            />
        </>
    )
}