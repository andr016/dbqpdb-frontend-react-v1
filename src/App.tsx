// always components
import TopBar from './components/TopBar'

// routes
import SubjectPage from './components/SubjectPage'
import Home from './components/Home'
import NotFound from './components/NotFound'
import AllSubjectsList from './components/AllSubjectsList'
import TypologyList from './components/TypologyList'
import Typology from './components/Typology'
import LoginPage from './components/LoginPage'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-200">
      <TopBar/>
      <div className="p-4">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />}/>

            <Route path="subject/:id" element={<SubjectPage />} />
            <Route path="subject" element={<AllSubjectsList />} />
            <Route path="typology" element={<TypologyList />} />
            <Route path="typology/:id" element={<Typology />}/>
            <Route path="login" element={<LoginPage />}/>
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App