import { deletedUserBulk, deletedUserSingle } from "@/api/UserApi";
import { showError, showInfo } from "@/utils/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletedUser = (token: string) => {
    const queryClient = useQueryClient();

    const deletedUserMutation = useMutation({
        mutationFn: (id: string) => deletedUserSingle(token, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["usersAll"] });

            showInfo("Pengguna berhasil dihapus.");
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    })

    const deleteUserMutation = useMutation({
        mutationFn: (ids: string[]) => deletedUserBulk(token, ids),
        onSuccess: (_, ids) => {
            queryClient.invalidateQueries({ queryKey: ["usersAll"] });

            showInfo(`${ids.length} pengguna berhasil dihapus.`);
        },
        onError: (error) => {
            showError(error.message || 'Something went wrong')
        }
    })

    return {
        deletedUserSingle: deletedUserMutation.mutateAsync,
        isDeletingSingle: deletedUserMutation.isPending,
        deletedUserBulk: deleteUserMutation.mutateAsync,
        isDeletingBulk: deleteUserMutation.isPending
    }
}