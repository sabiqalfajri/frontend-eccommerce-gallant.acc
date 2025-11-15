import { updateUser } from "@/api/UserApi";
import { AccountUserFormValues } from "@/schema/User.schema";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatedUser = (token: string | null) => {
    const queryClient = useQueryClient();

    const updateUserMutation = useMutation({
        mutationFn: async (data: AccountUserFormValues) => {
            if(!token) return null
            return await updateUser(token, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });

            showInfo("User updated successfully!");
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    })

    return {
        updateUser: updateUserMutation.mutateAsync,
        isUpdating: updateUserMutation.isPending,
        isErrorUpdating: updateUserMutation.isError
    }
}