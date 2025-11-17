import { useState, useEffect } from "react";

export const useCoutdown = (expiredAt?: string) => {
    const [time, setTime] = useState<{ hours: number, minutes: number, seconds: number } | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            if(!expiredAt) return;
            const now = new Date().getTime();
            const expired = new Date(expiredAt).getTime();
            const diff = expired - now;

            if(diff > 0) {
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setTime({ hours, minutes, seconds })
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiredAt])

    return time;
}

// export const useCoutdown = (expiredAt: string | Date) => {
//     const [secondsLeft, setSecondsLeft] = useState(0);

//     useEffect(() => {
//         const update = () => {
//             const diff = Math.max(0, Math.floor((new Date(expiredAt).getTime() - Date.now()) / 100));
//             setSecondsLeft(diff);
//             if(diff > 0) requestAnimationFrame(update)
//         };
//         update();
//     }, [expiredAt]);

//     return {

//     }
// }