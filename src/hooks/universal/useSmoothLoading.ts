import { useEffect, useState } from "react"

export const useSmoothLoading = (
    loading: boolean, 
    delay = 500
) => {
    const [isSmoothLoading, setIsSmoothLoading] = useState(loading);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if(loading) {
            setIsSmoothLoading(true);
        } else {
            timeout = setTimeout(() => {
                setIsSmoothLoading(false);
            }, delay)
        }
        return () => clearTimeout(timeout);
    }, [loading, delay])

    return isSmoothLoading;
}