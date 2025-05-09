'use client';
import { useState, useEffect, useRef } from "react";

export default function ClockTimer() {
    const [isClock, setIsClock] = useState(true); //Clock or Timer
    const [time, setTime] = useState(new Date());
    const [timerSeconds, setTimerSeconds] = useState(300); //初期タイマー5分
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isClock) {
            timerRef.current = setInterval(() => setTime(new Date()), 1000);
        } else if (isTimerRunning) {
            timerRef.current = setInterval(() => {
                setTimerSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        alert("時間です！");
                        setIsTimerRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isClock, isTimerRunning]);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsClock((prev) => !prev);
        setIsTimerRunning(false);
        setTimerSeconds(300);
    };

    const toggleTimer = () => {
        setIsTimerRunning((prev) => !prev);
    };

    return (
        <div
        className="p-4 bg-gray-100 rounded-2xl shadow text-center select-none cursor-pointer"
        onContextMenu={handleContextMenu}
        >
            {isClock ? (
                <div className="text-xl font-bold">
                    {time.toLocaleTimeString()}
                </div>

            ) : (
                <div>
                    <div className="text-xl font-bold">
                        {`${Math.floor(timerSeconds / 60)
                            .toString()
                            .padStart(2, '0')}:${(timerSeconds % 60)
                            .toString()
                            .padStart(2, '0')}`}
                    </div>

                    <button
                    className={`mt-2 px-3 py-1 rounded-2xl ${isTimerRunning ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
                    onClick={toggleTimer}>
                        {isTimerRunning ? "ストップ" : "スタート"}
                    </button>
                </div>
            )}
            <div className="text-xs text-gray-500 mt-2">
                (右クリックで時計/タイマー切り替え)
            </div>
        </div>
    );

}