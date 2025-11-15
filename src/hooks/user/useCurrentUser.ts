import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/UserApi";
import { Storage } from "@/services/Storage";
import { useAuth } from "@clerk/clerk-react";

export const useCurrentUser = () => {
    const { isSignedIn, getToken, isLoaded } = useAuth();

    const {
        data: currentUser,
        isLoading: isLoadingCurrentUser,
        isFetched: isFetchedCurrentUser,
        isError
    } = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const token = await getToken({ template: "server" });
            if (!token) return null; 
            const data = await getCurrentUser(token);
            Storage.setUser(data);
            return data
        },
        placeholderData: Storage.getUser(),
        staleTime: 1000 * 60 * 5,
        enabled: isLoaded && isSignedIn,
        refetchOnWindowFocus: false,
    })

    return {
        currentUser,
        isLoadingCurrentUser,
        isFetchedCurrentUser,
        isError
    }
}