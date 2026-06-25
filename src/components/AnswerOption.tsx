import { decode } from "he"

interface AnswerOptionProps {
  answer: string
  isSelected: boolean
  onClick: (answer: string) => void
}

function AnswerOption({ answer, isSelected, onClick }: AnswerOptionProps) {
  return (
    <button
      onClick={() => onClick(answer)}
      className={`w-7/12 p-4 rounded-sm hover:bg-slate-800 m-1
        ${isSelected
          ? "bg-linear-to-tl from-[var(--accent-2)] border-2 border-[var(--accent)]"
          : "border border-slate-700"
        }`}
    >
      {decode(answer)}
    </button>
  )
}

export default AnswerOption