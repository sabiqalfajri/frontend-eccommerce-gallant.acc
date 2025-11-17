import { useClerk } from "@clerk/clerk-react";
import { Storage } from "@/services/Storage";

export function useLogout() {
    const { signOut } = useClerk();

    const logout = async () => {
        try {
            Storage.removeUser();
            Storage.removeCartSelection();
            Storage.removeFilterProduct();
            await signOut({ redirectUrl: '/auth/sign-in' });
        } catch (error: any) {
            console.error(
                error.errors[0].longMessage ?? error?.message ?? 
                "SignOut failed unexpectedly"
            );
        }
    }

    return { logout };
}
