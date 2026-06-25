function StartButton({startQuiz}) {
  return (
    <button className='sm:m-1 sm:p-5 sm:w-100 m-2 p-4 bg-linear-to-tl from-[var(--accent)] to-[var(--accent-2)]
             w-6/12 border-none rounded-2xl'
             onClick={startQuiz}>Start Quiz</button>
  )
}

export default StartButton