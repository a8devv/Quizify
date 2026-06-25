type Props = {
    title: string
    color: string
    active: boolean
    emoji : string
    onClick : ()=> void
    
}
function DifficulyCard({title,color,active,emoji,onClick }: Props) {
    
  return (
    <div onClick={onClick}
     className={`mt-6 m-2 p-6 rounded-2xl border border-amber-300 transition-all duration-300 text-center
       ${active ? `${color} w-32 sm:w-40 sm:h-36` :  "border-slate-700 text-(--text-muted) h-30" } `}>
            <div className={` mb-3 ${active ? 'text-5xl' : "text-4xl"} `} >
                {active?emoji: '😑'}
            </div>
            <h3 className={`text-xl ${active ? 'font-extrabold' : 'font-light'}`}>{title}</h3>
            {
              active ? 
                <p className="text-(--text-muted) text-[13px] sm:text-xs">
                    10 Questions
                </p>
                : ''
            }
    </div>
  )
}

export default DifficulyCard