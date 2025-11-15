import { useQuery } from "@tanstack/react-query";
import { fetchUserAll } from "@/api/UserApi";

export const useUserAll = (token: string, page = 1, rowsPerPage = 10) => {
    const {
        data,
        isLoading: isLoadingCurrentUser,
        isFetched: isFetchedCurrentUser,
        isError
    } = useQuery({
        queryKey: ["usersAll"],
        queryFn: () => fetchUserAll(token!, page, rowsPerPage),
        staleTime: 1000 * 60 * 5,
        enabled: !!token
    })

    return {
        usersAll: data?.user || [],
        total: data?.total || 0,
        page: data?.page || 1,
        rowsPerPage: data?.rowsPerPage || 10,
        totalPages: data?.totalPages || 1,
        isLoadingUsersAll: isLoadingCurrentUser,
        isFetchedUsersAll: isFetchedCurrentUser,
        isError
    }
}
