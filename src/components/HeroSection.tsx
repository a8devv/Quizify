import questionimg from '../../public/img/question.webp'
 
function HeroSection() {
  return (
      <div className="flex items-center flex-col">
      <img
        src={questionimg}
        alt="question image"
        className="w-6/12 sm:h-45 h-35 mb-8 lg:w-3/12"
      />
      <h1 className="text-4xl font-bold block text-center">
        Ultimate <br />
        <span className="bg-linear-to-bl from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
          Quiz
        </span>{' '}
        Challenge
      </h1>
      <div className="w-auto m-2.5 mb-7 mx-0 text-(--text-muted) text-center text-xl">
        <p>Test your knowledge and challenge</p>
        <p>yourself with exciting questions!</p>
      </div>
    </div>
  )
}

export default HeroSection