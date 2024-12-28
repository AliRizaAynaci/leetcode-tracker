import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProblemList from './pages/ProblemList'
import Statistics from './pages/Statistics'
import AddProblem from './pages/AddProblem'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/add-problem" element={<AddProblem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App