import { Button } from "@/components/ui/button"
import './App.css'
import { useNavigate } from "react-router-dom"

function App() {
const navigate = useNavigate();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">AlgoFlow</h1>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/Login")}>Login</Button>
        <Button onClick={() => navigate("/Signup")}>Sign Up</Button>
        <Button onClick={() => navigate("/Dashboard")} variant="outline">Dashboard</Button>
      </div>
    </div>
  )
}

export default App
