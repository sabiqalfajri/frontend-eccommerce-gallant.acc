import { Storage } from "@/services/Storage";
import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react";

export const AuthWathcer = () => {
    const { isSignedIn } = useAuth();

    useEffect(() => {
        if(!isSignedIn) {
            Storage.removeUser();
            Storage.removeCartSelection();
            Storage.removeFilterProduct();
        }
    }, [isSignedIn]);

    return null
}