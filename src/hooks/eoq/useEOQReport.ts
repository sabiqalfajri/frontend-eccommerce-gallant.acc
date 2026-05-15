import { fetchEOQReport } from "@/api/EOQApi";
import { EOQPaginatedReport } from "@/types/EOQ";
import { useQuery } from "@tanstack/react-query";

export const useEOQReport = (
    token: string,
    page = 1,
    rowsPerPage = 10
) => {
    const {
        data,
        isPending,
        isFetching,
        isFetched,
        error
    } = useQuery<EOQPaginatedReport>({
        queryKey: [
            "eoqReport",
            page,
            rowsPerPage
        ],
        queryFn: () => fetchEOQReport(
            token,
            page,
            rowsPerPage
        ),
        enabled: !!token,
        staleTime: 1000 * 60 * 5
    });

    return {
        products: data?.products || [],
        total: data?.total || 0,
        page: data?.page || 1,
        rowsPerPage: data?.rowsPerPage || 10,
        totalPages: data?.totalPages || 1,
        isPendingReport: isPending,
        isFetching,
        isFetched,
        error
    }
}