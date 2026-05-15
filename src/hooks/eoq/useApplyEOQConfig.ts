import { applyEOQConfig } from "@/api/EOQApi"
import { EOQPayload } from "@/types/EOQ"
import { showError } from "@/utils/Toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useApplyEOQConfig = (token: string) => {
    const queryClient = useQueryClient()

    const applyMutation = useMutation({
        mutationFn: (
            data: EOQPayload
        ) => {
            if(!token) throw new Error("Unauthorized")
                
            return applyEOQConfig(
                token,
                data
            )
        },
        onSuccess: (data) => {
            queryClient.setQueryData(
                ["eoqConfig"],
                data
            )
            queryClient.invalidateQueries({
                queryKey: ["eoqReport"]
            })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            showError(
                error.message ||
                "Something went wrong"
            )
        }
    })

    return {
        applyConfig: applyMutation.mutateAsync,
        isApplying: applyMutation.isPending
    }
}