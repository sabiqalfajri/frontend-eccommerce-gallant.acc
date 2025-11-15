
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import { createContext, useContext } from "react";

type User = {
    email: string
    name: string;
    role: string;
}

interface AuthContextProps {
    user: User | null;
    isLoading: boolean;
    error: unknown
};

const AuthContext = createContext<AuthContextProps>({
    user: null,
    isLoading: false,
    error: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser, isLoadingCurrentUser, isError } = useCurrentUser();

    return (
        <AuthContext.Provider 
        value={{ user: currentUser ?? null, isLoading: isLoadingCurrentUser, error: isError }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new 
    Error("useAuthContext must be inside AuthProvider");
    return ctx;
}