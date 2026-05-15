import { useEffect, useState } from "react";

const useFeedingTimer = (
    onChange?: (minutes: number) => void
) => {

    const [seconds, setSeconds] = useState(0);

    const [running, setRunning] =
        useState(false);

    // ▶️ iniciar / pausar
    const toggleTimer = () => {
        setRunning((prev) => !prev);
    };

    // 🔄 reset
    const resetTimer = () => {

        setRunning(false);

        setSeconds(0);
    };

    // ⏱️ cronómetro
    useEffect(() => {

        let interval: ReturnType<typeof setInterval>;

        if (running) {

            interval = setInterval(() => {

                setSeconds((prev) => prev + 1);

            }, 1000);
        }

        return () => {

            if (interval) {
                clearInterval(interval);
            }
        };

    }, [running]);

    // ✅ ahora sí notificamos correctamente
    useEffect(() => {

        const minutes =
            Math.floor(seconds / 60);

        onChange?.(minutes);

    }, [seconds]);

    // 🕒 formato
    const minutes =
        Math.floor(seconds / 60);

    const secs =
        seconds % 60;

    const formattedTime =
        `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    return {
        formattedTime,
        running,
        toggleTimer,
        resetTimer,
        minutes,
    };
};

export default useFeedingTimer;