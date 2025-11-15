import { useState, useEffect } from "react";

const COOLDOWN_STEP = [30, 60, 120];
const MAX_ATTEMPT = COOLDOWN_STEP.length;

export const useCooldownResend = (key: string) => {
    const [attempt, setAttempt] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem(`resend_${key}`);
        if(saved) {
            const { attempt: savedAttempt, nextTime } = JSON.parse(saved);
            const diff = Math.floor((nextTime - Date.now()) / 1000);
            if(diff > 0) {
                setTimeLeft(diff);
                setAttempt(savedAttempt);
            }
        }
    }, [key]);

    useEffect(() => {
        if(timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if(prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const triggerResend = () => {
        if(attempt >= MAX_ATTEMPT) return false;

        const delay = COOLDOWN_STEP[attempt] * 1000;
        const nextTime = Date.now() + delay;
        localStorage.setItem(
            `resend_${key}`,
            JSON.stringify({ attempt: attempt + 1, nextTime })
        );

        setAttempt(attempt + 1);
        setTimeLeft(delay / 1000);
        return true;
    };

    return {
        timeLeft,
        canResend: timeLeft <= 0 && attempt < MAX_ATTEMPT,
        triggerResend,
        attempt
    }
}