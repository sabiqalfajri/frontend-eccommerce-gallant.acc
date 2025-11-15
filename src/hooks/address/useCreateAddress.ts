import { createAddress } from "@/api/AddressApi";
import { AddressInput } from "@/schema/Address.schema";
import { showError } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAddress = (token: string) => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (payload: AddressInput) => {
            return await createAddress(payload, token)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["address"] })
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    })

    return {
        createAddress: createMutation.mutateAsync,
        isCreatingAddress: createMutation.isPending
    }
}