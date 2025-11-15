import { deleteAddress } from "@/api/AddressApi";
import { Address } from "@/types/Address";
import { showError } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAddress = (token: string) => {
    const queryClient = useQueryClient();

    const deleteAddressMutation = useMutation({
        mutationFn: async (id: string) => {
            return await deleteAddress(token, id)
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["address"] })
            const previousAddress = queryClient.getQueryData<Address[]>(["address"]);

            queryClient.setQueryData<Address[]>(["address"], (old = []) => 
                old.filter(item => item.id !== id)
            )

            return { previousAddress }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["address"] })
        },
        onError: (error, _variables, context) => {
            if(context?.previousAddress) {
                queryClient.setQueryData(["address"], context.previousAddress)
            }
            showError(error.message || 'Something went wrong')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["address"] })
        }
    });

    return {
        deleteAddress: deleteAddressMutation.mutate,
        isDeletingAddress: deleteAddressMutation.isPending,
        isErrorDeleteAddress: deleteAddressMutation.isError
    }
}