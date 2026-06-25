import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Quiz from "./pages/Quiz"
import Result from "./pages/Result"

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/quiz/:difficulty" element={<Quiz/>}/>
        <Route path="/result/:score" element={<Result/>}/>
      </Routes>
  )
}

export default App