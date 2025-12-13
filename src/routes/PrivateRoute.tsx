import { LoadingGlobal } from "@/components/shared/LoadingGlobal";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const { currentUser, isLoadingCurrentUser, isError } = useCurrentUser();

    if (isLoadingCurrentUser) return <LoadingGlobal show />;
    if (isError || !currentUser) return <Navigate to="/auth/sign-in" replace />;
    if (currentUser.role !== "ADMIN") {
        return <Navigate to="/403" replace />;
    }

    return <Outlet />;
}