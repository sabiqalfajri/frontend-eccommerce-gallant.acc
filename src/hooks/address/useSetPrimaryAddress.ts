import { setPrimaryAddress } from "@/api/AddressApi";
import { Address } from "@/types/Address";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSetPrimaryAddress = (token: string) => {
    const queryClient = useQueryClient();

    const setPrimaryMutation = useMutation({
        mutationFn: async (id: string) => {
            return await setPrimaryAddress(token, id)
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["address"] })
            const previousAddress = queryClient.getQueryData<Address[]>(["address"]);

            if(previousAddress) {
                queryClient.setQueryData<Address[]>(["address"], (old) => 
                    old?.map(addr => ({
                        ...addr,
                        isDefault: addr.id === id
                    })) || []
                )
            }

            return { previousAddress }
        },
        onSuccess: () => {
            showInfo('Alamat berhasil dipilih. Nikmati pengalaman belanja!')
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
    })

    return {
        setDefaultAddress: setPrimaryMutation.mutateAsync,
        
    }
}