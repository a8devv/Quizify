import { useEffect } from 'react'
import Champion from '../../public/img/Champion.webp'
import WellDone from '../../public/img/WellDone.png'
import KeepTrying from '../../public/img/KeepTrying.png'
import confetti from "canvas-confetti"
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import { MdHome } from 'react-icons/md'

function Result() {
    const { score } = useParams()
    const finalScore = Number(score || 0)
    const percentage = Math.round((finalScore / 10) * 100)
    const message =
    finalScore >= 8
    ? "🏆 Excellent"
    : finalScore >= 5
    ? "🎉 Good Job"
    : "💪 Keep Practicing"
    const navigate = useNavigate()
    useEffect(() => {
        if(finalScore < 5 ) return;
        const duration = 3000
        const end = Date.now() + duration

        const frame = () => {
        confetti({
             particleCount: 3,
             angle: 60,
             spread: 55,
             origin: { x: 0 },
        })

        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
        })

        if (Date.now() < end) {
            requestAnimationFrame(frame)
        }
  }

  frame()
}, [finalScore])

  return (
    <div className='flex justify-center items-center flex-col'>
    <div className='flex flex-col justify-center items-center h-80 w-full'>
        
        <img className="h-7/12"src={finalScore > 7 ? Champion : finalScore >= 5 ? WellDone : KeepTrying}  />
        <h2 className='text-2xl font-bold'>Quiz Completed!</h2>
        <p className='text-(--text-muted) text-center'>{message}</p>
    </div>
    <div className='bg-slate-900 sm:w-6/12 lg:w-3/12 w-10/12 rounded-2xl h-40 flex flex-col justify-center  items-center'>
        <div className='flex gap-20'>
            <div className='flex flex-col items-center justify-center w-20'>
                <p>Your Score</p>
                <span className={` flex text-5xl ${finalScore < 5 ? 'text-red-600' :  'text-green-600'}`}>
                   {finalScore} <p className=' text-3xl font-bold'> / 10</p>
                </span>
            </div>
            <div className='w-25 h-25 sm:ml-15'>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                    strokeLinecap: "round",
                    pathColor: "var(--green)",
                    textColor: "#fff",
                    trailColor: "var(--green-bg)",
                    })}
/>
            </div>
        </div>
    </div>

    <div className='flex justify-center p-4  w-5/12 h-18 m-10 rounded-2xl
     bg-linear-to-tl from-[var(--accent)] to-[var(--accent-2)]'
     onClick={()=> navigate('/')}>
        <button className='flex items-center gap-2 text-xl'><MdHome className='text-3xl'/> Go Home</button>
    </div>
    </div>
  )
}

export default Result