import { fetchAddressById } from "@/api/AddressApi"
import { Address } from "@/types/Address"
import { useQuery } from "@tanstack/react-query"

export const useAddressById = (token: string, id: string) => {
    const { data: addressById, isLoading: isLoadingAddressById, isFetched: isFetchedAddressById } = useQuery<Address>({
        queryKey: ["addressById", id],
        queryFn: () => fetchAddressById(token, id),
        staleTime: 1000 * 60 * 5,
        enabled: !!token && !!id,
    })

    return {
        addressById,
        isLoadingAddressById,
        isFetchedAddressById
    }
}