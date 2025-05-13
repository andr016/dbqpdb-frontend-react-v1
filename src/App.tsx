import TopBar from './components/TopBar'
import SubjectPage from './components/SubjectPage'
import Home from './components/Home'
import NotFound from './components/NotFound'
import AllSubjectsList from './components/AllSubjectsList'
import TypologyList from './components/TypologyList'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import axios from 'axios'
import Typology from './components/Typology'
import LoginPage from './components/LoginPage'
import { Suspense } from 'react'

const api = axios.create({
  baseURL: `http://localhost:3000/`
})
// ATTENTION! Eto moe pervoe video ne sudite strogo mne 10 let

function App() {
  return <Suspense fallback={<div>Loading...</div>}>
  <div className="w-full min-h-screen bg-gray-900 text-gray-200">
    <TopBar/>
    <div className="p-4">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="subject/:id" element={<SubjectPage />} />
          <Route path="subject" element={<AllSubjectsList />} />
          <Route path="typology" element={<TypologyList />} />
          <Route path="typology/:id" element={<Typology />}/>
          <Route path="login" element={<LoginPage />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Router>
    </div>
  </div>
  </Suspense>
}

export default App