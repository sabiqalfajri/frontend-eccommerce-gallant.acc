import { Storage } from "@/services/Storage";
import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react";

export const AuthWathcer = () => {
    const { isSignedIn, isLoaded } = useAuth();

    useEffect(() => {
        if (!isLoaded) return;
        if(!isSignedIn) {
            Storage.removeUser();
            Storage.removeCartSelection();
            Storage.removeFilterProduct();
        }
    }, [isSignedIn, isLoaded]);

    return null
}