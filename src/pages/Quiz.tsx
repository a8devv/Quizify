import { useEffect, useState,useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { decode } from "he"
import { HiArrowRight } from "react-icons/hi"
import QuizHeader from "../components/QuizHeader"
import AnswerOption from "../components/AnswerOption"

interface Question {
    question : string
    correct_answer : string
    incorrect_answers : string[]
}

const TIMER_SECONDS = 30



function Quiz() {
    const [searchParams] = useSearchParams()
    const  difficulty = searchParams.get("difficulty") || "easy"
    const navigate = useNavigate()

    const [questions,setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score,setScore] = useState(0)
    const [loading , setLoading]=useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  
    // Calculate quiz progress percentage
    const progress =
  ((currentQuestion + 1) / questions.length) * 100

  // Fetch quiz questions
    useEffect(()=>{
        async function fetchQuestions() {
            try {
                const res = await fetch (`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`);
                const data = await res.json()
                setQuestions(data.results || [])
            }catch (error){
                console.error(error);
                
            }finally{
                setLoading(false)
            }
        }
        fetchQuestions()
    },[difficulty])

    // Shuffle answer options whenever the question changes
   const answers = useMemo(() => {
  if (questions.length === 0) return []

  const q = questions[currentQuestion]

  return [q.correct_answer, ...q.incorrect_answers].sort(
    () => Math.random() - 0.5
  )
}, [questions, currentQuestion])

  useEffect(() => {
  if (questions.length === 0) return
  const timer = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        clearInterval(timer)
        return 0
      }

      return prev - 1
    })
  }, 1000)

  return () => clearInterval(timer)
}, [currentQuestion,questions])


useEffect(() => {
  if (timeLeft === 0) {
    handleNext()
  }
}, [timeLeft])
    if(loading){
        return (
            <div className="h-screen flex justify-center items-center text-6xl">Loading...</div>
        )
    }
    
     if (questions.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        
        No questions found. Try again.
      </div>
    )
  }

  const question = questions[currentQuestion]

  
  // Store the user's selected answer
  const handleAnswer = (answer: string) => {
  setSelectedAnswer(answer)
}
// Validate answer and move to the next question
function handleNext() {
   let newScore = score

  if (selectedAnswer === question.correct_answer) {
    newScore++
    setScore(newScore)
  }

  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(prev => prev + 1)
    setSelectedAnswer(null)
    setTimeLeft(TIMER_SECONDS)
  } else {
    navigate(`/result/${newScore}`)
  }
}


    return (
        <>
        <header >
            <QuizHeader
              currentQuestion={currentQuestion}
              total={questions.length}
              progress={progress}
              timeLeft={timeLeft}
              onBack={() => navigate('/')}
            />
        </header>
        <main>

            <div className="flex justify-center items-center flex-col">
                {/* Quiz question */}
            <h2 className="w-9/12 h-5/12 p-4 border border-slate-700 rounded-sm  my-5">{decode(question.question)}</h2>
                {/* Answer options */}
                {answers.map((answer , index) => (
                  <AnswerOption
                  key={index}
                  answer={answer}
                  isSelected={selectedAnswer === answer}
                  onClick={handleAnswer}
                  />
                ))}

            </div>
                                 

            {/* Next question button */}
                <div className="w-full flex justify-center items-center">
                    <button className={`sm:mt-7 p-2 h-15 
                   w-5/12 border-none rounded-2xl flex justify-center items-center gap-4
                   ${selectedAnswer ? "bg-linear-to-tl from-[var(--accent)] to-[var(--accent-2)]": " bg-[var(--text-muted)]"}
                 `} 
                 onClick={handleNext }
                 disabled={!selectedAnswer}>
                     Next Question <HiArrowRight/>
                </button>

                </div>
        </main>

        </>
  )
}


export default Quiz