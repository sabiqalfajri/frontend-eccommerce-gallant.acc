import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EOQProduct } from "@/types/EOQ"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "react"
import { StatusPopover } from "./StatusPopover";
import { EOQTooltip } from "./EOQTooltip";

interface EOQContentProps {
    data: EOQProduct[];
    isLoading?: boolean
}

export const EOQContent = ({
    data = [],
    isLoading
}: EOQContentProps) => {
    const columns: ColumnDef<EOQProduct>[] = useMemo(() => {
        return [
            {
                accessorKey: "productName",
                header: "Produk",
                meta: { className: "min-w-[300px] lg:w-[40%] whitespace-normal" },
                cell: ({ row }) => {
                    const current = row.original;

                    return (
                        <div className="flex items-center gap-x-3">
                            <img 
                                src={current.productImage}
                                alt={current.productName}
                                className="w-12 h-12 object-cover rounded-md border-[1.5px] border-gray-200 shrink-0"
                            />
                            <span className="line-clamp-2 leading-snug min-w-0">
                                {current.productName}
                            </span>
                        </div>
                    )
                },
            },
            {
                accessorKey: "totalSold",
                header: "Total Terjual",
                cell: ({ row }) => <span>{row.original.totalSold.toLocaleString()} unit</span>
            },
            {
                accessorKey: "currentStock",
                header: "Stok",
                cell: ({ row }) => (
                    <span>
                        {row.original.currentStock}
                    </span>
                )
            },
            {
                accessorKey: "eOQ",
                header: () => 
                    <div className="flex flex-nowrap items-center gap-1">
                        <p>EOQ</p>
                        <EOQTooltip />
                    </div>
                ,
                cell: ({ row }) => (
                    <span>
                        {row.original.recomendedOrder}
                    </span>
                )
            },
            {
                accessorKey: "recommendedOrder",
                header: "Rekomendasi",
                cell: ({ row }) => (
                    <div className="flex flex-col gap-0.5">
                        <span className="font-medium">
                            {row.original.recomendation}
                        </span>
                        <p className="text-[11px] text-gray-400 leading-tight">
                            Berdasarkan efisiensi biaya (EOQ)
                        </p>
                    </div>
                )
            },
            {
                accessorKey: "status",
                header: () => 
                    <div className="flex flex-nowrap items-center gap-1">
                        <p>Status</p>
                        <StatusPopover />
                    </div>
                ,
                cell: ({ row }) => {
                    const status = row.original.status;
                    const variants: Record<string, string> = {
                        optimal: "bg-green-100 text-green-700 border-green-200",
                        reorder: "bg-yellow-100 text-yellow-700 border-yellow-200",
                        critical: "bg-red-100 text-red-700 border-red-200",
                        overstock: "bg-blue-100 text-blue-700 border-gray-200",
                        unknown:  "bg-gray-100 text-gray-500 border-gray-200",
                    };
                    
                    return (
                        <Badge variant="outline" className={`${variants[status]} capitalize`}>
                            {status}
                        </Badge>
                    );
                }
            },
        ]
    }, [])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table>
            <TableHeader className="bg-[#F5F5F5]">
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead 
                                key={header.id}
                                className={header.column.columnDef.meta?.className}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    <TableRow className="hover:bg-transparent">
                        <TableCell 
                            colSpan={columns.length} 
                            className="h-24 text-center"
                        >
                            <div className="flex justify-center items-center py-4">
                                <span className="animate-spin w-5 h-5 border-2 border-t-transparent border-gray-400 rounded-full mr-2"></span>
                                Loading data...
                            </div>
                        </TableCell>
                    </TableRow>
                ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="hover:bg-gray-50/50 transition-colors">
                            {row.getVisibleCells().map((cell) => (
                                <TableCell 
                                    key={cell.id}
                                    className={cell.column.columnDef.meta?.className}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-30 text-center">
                            Tidak ada data.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}