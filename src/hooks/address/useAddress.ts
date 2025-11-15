import { fetchAddressByUserId } from "@/api/AddressApi"
import { Address } from "@/types/Address"
import { useQuery } from "@tanstack/react-query"

export const useAddress = (token: string) => {
    const { data: address = [], isLoading, isFetched } = useQuery<Address[]>({
        queryKey: ["address"],
        queryFn: () => fetchAddressByUserId(token),
        select: (data) => data.sort((a, b) => (a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1)),
        staleTime: 1000 * 60 * 5,
        enabled: !!token
    })

    return {
        address,
        isLoadingAddress: isLoading,
        isFetchedAddress: isFetched,
    }
}