import { LoadingGlobal } from "@/components/shared/LoadingGlobal";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const { currentUser, isLoadingCurrentUser, isError } = useCurrentUser();

    if(isLoadingCurrentUser) return <LoadingGlobal show />;
    if (isError || !currentUser) return <Navigate to="/auth/sign-in" replace />;

    return <Outlet />;
}