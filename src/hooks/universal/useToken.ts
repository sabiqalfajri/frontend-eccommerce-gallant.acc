import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

export const useToken = () => {
    const { getToken } = useAuth();
    const { isSignedIn, isLoaded } = useUser();
    const [token, setToken] = useState<string | null>(null);
    const [isLoadingToken, setIsLoadingToken] = useState(true);

    useEffect(() => {
        const fetchToken = async () => {
            if(!isLoaded) return;

            if(!isSignedIn) {
                setToken(null);
                setIsLoadingToken(false);
                return;
            }
            
            const t = await getToken({ template: "server" });
            setToken(t ?? null);
            setIsLoadingToken(false);
        };

        fetchToken();
    }, [getToken, isSignedIn, isLoaded])

    return { token, isLoadingToken };
}