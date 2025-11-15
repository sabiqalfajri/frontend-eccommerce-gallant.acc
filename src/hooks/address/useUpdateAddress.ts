import { updateAddressById } from "@/api/AddressApi";
import { AddressInput } from "@/schema/Address.schema";
import { showError } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateAddress = (token: string, id: string) => {
    const queryClient = useQueryClient();

    const updateAddressMutation = useMutation({
        mutationFn: async (payload: AddressInput) => {
            return await updateAddressById(token, payload, id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["address"] })
            queryClient.invalidateQueries({ queryKey: ["addressById"] })
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    })

    return {
        updateAddress: updateAddressMutation.mutateAsync,
        isUpdatingAddress: updateAddressMutation.isPending
    }
}