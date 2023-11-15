import { useEffect, useRef, useState } from "react";

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;

/**
 *
 * @param func The original, non debounced function (You can pass any number of args to it)
 * @param delay The delay (in ms) for the function to return
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
 */

export const useDebounceFunc = <Func extends SomeFunction>(
    func: Func,
    delay = 1000
) => {
    // const [debouncedFunc, setDebouncedFunc] = useState<(...args: any[]) => void>(() => {});
    const timer = useRef<Timer>();

    let debouncedFunc = (...args: any[]) => {

        const newTimer = setTimeout(() => func(...args), delay);

        clearTimeout(timer.current);
        timer.current = newTimer;
    };

    useEffect(() => {
        return () => {
            if (!timer.current) return;
            console.log("drop")
            clearTimeout(timer.current);
        };
    }, []);

    return debouncedFunc;
}

export const useDebounce = (value: string, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState("");
    const timerRef = useRef<Timer>();

    useEffect(() => {
        timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [value, delay]);

    return debouncedValue;
};