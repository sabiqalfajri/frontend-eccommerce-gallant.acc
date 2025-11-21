import { useState, useEffect } from "react";

export const useCountdown = (expiredAt?: string) => {
    const [time, setTime] = useState<{ minutes: number, seconds: number } | null>(null)

    useEffect(() => {
        if(!expiredAt) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const expired = new Date(expiredAt).getTime();
            const diff = expired - now;

            if(diff <= 0) {
                setTime({ minutes: 0, seconds: 0 });
                clearInterval(interval);
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            setTime({ minutes, seconds })
        }, 1000);

        return () => clearInterval(interval);
    }, [expiredAt])

    return time;
}