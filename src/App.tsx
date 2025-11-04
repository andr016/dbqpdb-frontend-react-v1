// always components
import TopBar from './components/TopBar'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-200">
      <TopBar/>
      <div className="p-4 maxw-[1024px]">
        <Router>
          <AppRoutes/>
        </Router>
      </div>
    </div>
  )
}

export default App