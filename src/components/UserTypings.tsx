import cn from "classnames"
import Caret from "./Caret";

const UserTypings = ({
    userInput,
    className,
    words
}: {
    userInput: string;
    words: string;
    className?: string
}) => {
    const typedCharacters = userInput.split("");

    return (
        <div className={className}>
            {typedCharacters.map((char, index) => {
                return <Character key={`${char}_${index}`} actual={char} expected={words[index]} />
            })}
            <Caret />
        </div>
    )
}

const Character = ({ actual, expected }: { actual: string, expected: string }) => {
    const isCorret = actual === expected;
    const isWhiteSpace = expected === ""
    return <span className={cn({
        "text-red-500": !isCorret && !isWhiteSpace,
        "text-primary-400": isCorret && !isWhiteSpace,
        "bg-red-500/50": !isCorret && isWhiteSpace
    })}>{expected}</span>
}

export default UserTypings;