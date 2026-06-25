import { SlArrowLeft } from "react-icons/sl"

interface QuizHeaderProps {
  currentQuestion: number
  total: number
  progress: number
  timeLeft: number
  onBack: () => void
}

function QuizHeader({ currentQuestion, total, progress, timeLeft, onBack }: QuizHeaderProps) {
  return (
    <header>
      {/* Back + Question Counter */}
      <div className="flex justify-around w-full p-5">
        <SlArrowLeft className="cursor-pointer" onClick={onBack} />
        <h3>Question {currentQuestion + 1} of {total}</h3>
        <p>.</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-5.5 flex justify-around mt-5">
        <div className="h-5.5 w-7/12 mx-4 bg-slate-800 rounded-full">
          <div
            className="h-5.5 bg-linear-to-tl from-[var(--accent)] to-[var(--accent-2)] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p>{Math.round(progress)}%</p>
      </div>

      {/* Timer */}
      <div className="w-full flex justify-center items-center mt-7">
        <div className="w-15 h-10 bg-slate-900 border border-(--border) rounded-2xl flex justify-center items-center">
          ⏱ {timeLeft}s
        </div>
      </div>
    </header>
  )
}

export default QuizHeader