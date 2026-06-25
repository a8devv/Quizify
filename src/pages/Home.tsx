import { useState } from 'react'
import DifficulyCard from '../components/DifficulyCard'
import { useNavigate } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import StartButton from '../components/StartButton'
function Home() {
  const [difficulty ,setdifficulty] = useState<string>("easy")
  const navigate = useNavigate()
  const startQuiz = (): void => {
    navigate(`/quiz/${difficulty}`)
  }
  return (
    <div className='h-screen'>
        <header >
          <HeroSection/>
        </header>
        <main>
          <div className='flex items-center flex-col h-50'>
            <h2 className='text-xl'>Chose Difficulty</h2>
            <div className='flex '>
        
            <DifficulyCard 
            title='Easy'
            color= "border-green-400"
            active = {difficulty === "easy"}
            emoji='😊'
            onClick={()=> setdifficulty("easy")}
            />
            <DifficulyCard 
            title='medium'
            color= "border-yellow-400"
            active = {difficulty === "medium"}
            emoji='😀'
            onClick={()=> setdifficulty("medium")}
            />
            <DifficulyCard 
            title='hard'
            color= "border-red-400"
            active = {difficulty === "hard"}
            emoji='😎'
            onClick={()=> setdifficulty("hard")}
            />
            </div >
            <StartButton startQuiz={startQuiz}/>
          </div>

        </main>
    </div>
  )
}

export default Home