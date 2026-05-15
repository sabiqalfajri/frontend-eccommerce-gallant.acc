import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "../ui/button";

interface PaginationProps {
    page: number;
    totalPages: number;
    totalRows: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
    page,
    totalPages,
    totalRows,
    rowsPerPage,
    onPageChange,
}: PaginationProps) => {
    const from = (page - 1) * rowsPerPage + 1;
    const to = Math.min(page * rowsPerPage, totalRows);

    return (
        <div className="flex flex-wrap items-center justify-between py-1">
            <p className="text-sm text-gray-500">
                Showing {from}-{to} of {totalRows}
            </p>
            <div className="flex items-center gap-x-2 py-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                >
                    <IoIosArrowBack className="translate-y-px" size={27} />
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                >
                    Next
                    <IoIosArrowForward className="translate-y-px" size={27} />
                </Button>
            </div>
        </div>
    )
}