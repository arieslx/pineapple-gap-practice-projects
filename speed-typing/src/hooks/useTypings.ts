import  { useCallback, useEffect, useRef, useState } from "react"
import { isKeyboardCodeAllowed } from "../utils/helper"


const useTypings = (enabled: boolean) => {
    const [cursor, setCursor] = useState(0);
    const [typed, setTyped] = useState<string>("")
    const totalTyped = useRef(0)

    const keydownHandler = useCallback(({key, code}: KeyboardEvent) => {
        if(!enabled || !isKeyboardCodeAllowed(code)){
            return;
        }

        switch (key) {
            case "Backspace":
                setTyped((prev) => prev.slice(0, -1))
                setCursor(cursor -1)
                totalTyped.current -= 1
                break;
        
            default:
                setTyped((prev) => prev.concat(key))
                setCursor((cursor) => cursor + 1)
                totalTyped.current += 1;
        }
    }, [enabled])

    const clearTyped = useCallback(() => {
        setTyped("")
        setCursor(0)

    },[])

    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", keydownHandler);

        return () => {
            window.removeEventListener("keydown", keydownHandler)
        }
    },[keydownHandler])

    return {
        typed,
        cursor,
        clearTyped,
        resetTotalTyped,
        totalTyped: totalTyped.current
    }
}


export default useTypings