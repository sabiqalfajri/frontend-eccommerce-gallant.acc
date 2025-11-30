import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { IoIosArrowForward, IoIosArrowBack  } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi2";

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { CardDashboard } from "../admin/Card";
import { ModalConfirm } from "./ModalDelete";
import { DropdownCustom } from "./DropdownCustom";
import { IoFilterOutline } from "react-icons/io5";

interface DataTableProps<TData extends { id: string }, TValue> {
    title: string
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    totalRows?: number
    filterButtons?: {
        label: string;
        value: string;
    }[]
    onFilterChange?: (value: string) => void;
    currentFilter?: string;
    onClick?: () => void;
    onDeleted?: (ids: string[]) => Promise<void> | void;
    isDeleting?: boolean;
    filterPlaceholder?: string
    page: number;
    totalPages: number;
    onPageChange?: (page: number) => void
    isLoading?: boolean
}

export const DataTable = <TData extends { id: string }, TValue>({ 
    title,
    columns, 
    data, 
    totalRows,
    filterButtons,
    onFilterChange,
    currentFilter,
    onClick,
    onDeleted,
    isDeleting,
    page,
    totalPages,
    onPageChange,
    // filterPlaceholder,
    isLoading
}: DataTableProps<TData, TValue>) => {
    const [sorting , setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [showDeletedBtn, setShowDeletedBtn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    useEffect(() => {
        const selectedRows = table.getSelectedRowModel().rows
        setShowDeletedBtn(selectedRows.length > 0)
    }, [table.getSelectedRowModel().rows.length])

    const handleDeleteSelected = async () => {
        const selectedIds = table
        .getSelectedRowModel()
        .rows.map((row) => (row.original as any).id);
        if (selectedIds.length === 0) return;

        try {
            if(onDeleted) {
                await onDeleted(selectedIds)
            }
        } catch (error) {
            console.error("Error deleting selected items:", error);
        } finally {
            setShowModal(false);
            table.resetRowSelection();
            setShowDeletedBtn(false);
        }
    }

    return (
        <>
            <div className={`w-full flex flex-col ${filterButtons && 'gap-y-6'}`}>
                {/* Filter dan Column Visibility */}
                <div className="flex flex-wrap justify-between gap-3 items-center">
                    {filterButtons && filterButtons.length > 0 && (
                        <>
                        <div className="hidden md:flex flex-wrap gap-x-2 bg-white rounded-md">
                            {filterButtons.map((btn) => (
                                <Button
                                key={btn.value}
                                variant={currentFilter === btn.value ? 'borderBottom' : 'ghost'}
                                size="lg"
                                onClick={() => onFilterChange && onFilterChange(btn.value)}
                                >
                                    {btn.label}
                                </Button>
                            ))}
                        </div>

                            {/* Filter Mobile */}
                            <DropdownCustom 
                            className="w-20"
                            align="start"
                            menu={filterButtons.map((btn) => ({
                                label: btn.label,
                                onClick: () => onFilterChange && onFilterChange(btn.value)
                            }))}
                            >
                                <Button
                                variant="outline"
                                size="lg"
                                className="flex flex-wrap gap-x-1.5 md:hidden text-sm"
                                >
                                    <IoFilterOutline size={20} />
                                    <p>Filter</p>
                                </Button>
                            </DropdownCustom>
                        </>
                    )}
                    {onClick !== undefined && (
                        <Button
                        variant="primary"
                        size="lg"
                        onClick={onClick}
                        >
                            + Add New Item
                        </Button>
                    )}
                </div>
                <CardDashboard 
                title={title} 
                headerContent={
                    showDeletedBtn && (
                        <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="hover:bg-gray-100 p-1.5 rounded-md cursor-pointer"
                        >
                            <HiOutlineTrash size={20} />
                        </button>
                    )
                }
                >
                    <div className="rounded-md border border-gray-200">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            <div className="flex justify-center items-center py-4">
                                                <span className="animate-spin w-5 h-5 border-2 border-t-transparent border-gray-400 rounded-full mr-2"></span>
                                                Loading data...
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => {
                                        const selected = row.getIsSelected();
                                        return (
                                            <TableRow key={row.id} 
                                            className={selected ? 'bg-[#E7EEFA]! hover:brightness-100!' : ""}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id} 
                                                    className={cell.column.columnDef.meta?.className}
                                                    >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        )
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-30 text-center">
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {/* Pagination */}
                    <div className="flex flex-wrap items-center justify-between py-1">
                        <div>
                            <p className="text-sm">
                                Showing{" "}
                                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                                -
                                {Math.min(
                                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                    table.getFilteredRowModel().rows.length
                                )}{" "}
                                of {totalRows}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2 py-2">
                            <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange && onPageChange(page - 1)}
                            disabled={page <= 1}
                            >
                                <IoIosArrowBack className="translate-y-px" size={27} />
                                Previous
                            </Button>
                            <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange && onPageChange(page + 1)}
                            disabled={page >= totalPages}
                            >
                                Next
                                <IoIosArrowForward className="translate-y-px" size={27} />
                            </Button>
                        </div>
                    </div>
                </CardDashboard>
            </div>

            <ModalConfirm
                isOpen={showModal}
                onCancel={() => setShowModal(false)}
                onConfirm={handleDeleteSelected}
                isLoading={isDeleting}
                variant="DELETE"
                confirmLabel="Delete"
                title="Delete"
                description={`Are you sure you want to delete (${table.getSelectedRowModel().rows.length}) products?. This action cannot be undone`}
                size="sm"
            />
        </>
    )
}