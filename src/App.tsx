import RestartButton from "./components/RestartButton"
import Results from "./components/Result"
import UserTypings from "./components/UserTypings"
import useEngine from "./hooks/useEngine"
import { calculateAccuracyPercentage } from "./utils/helper"

function App() {
  const { state, typed, words, timeLeft, errors, restart, totalTyped } = useEngine()
  return <>
    <Intro />
    <CountdownTimer timeLeft={timeLeft} />
    <WordsContainer>
      <GenerateWords words={words} />
      <UserTypings className="absolute inset-0" words={words} userInput={typed} />
    </WordsContainer>
    <RestartButton
      className="mx-auto mt-10 text-slate-500"
      onRestart={restart}
    />
    <Results
      className="mt-10"
      state={state}
      errors={10}
      accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
      total={totalTyped}
    />
  </>
}

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all">{children}</div>
  )
}


const GenerateWords = ({ words }: { words: string }) => {
  return <div className="text-slate-500">
    {words}
  </div>
}

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>
}

const Intro = () => {
  return <h2 className="text-green-400 font-medium">
    <p> Demo: https://speed-typing-ten.vercel.app/</p>
    <p>Source Code: https://github.com/CodeWithGionatha-L...</p>
    <p>vide: https://www.youtube.com/watch?v=oc7BMlIU3VY</p>
  </h2>
}


export default App;
