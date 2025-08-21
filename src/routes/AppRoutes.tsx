// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom'

// Pages
import Home from '../components/Home'
import NotFound from '../components/NotFound'
import SubjectPage from '../components/SubjectPage'
import AllSubjectsList from '../components/AllSubjectsList'
import TypologyList from '../components/TypologyList'
import Typology from '../components/Typology'
import LoginPage from '../components/LoginPage'

export const ROUTES = {
  HOME: '/',
  SUBJECT: '/subject',
  SUBJECT_ID: '/subject/:id',
  TYPOLOGY: '/typology',
  TYPOLOGY_ID: '/typology/:id',
  LOGIN: '/login',
} as const

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.SUBJECT} element={<AllSubjectsList />} />
      <Route path={ROUTES.SUBJECT_ID} element={<SubjectPage />} />
      <Route path={ROUTES.TYPOLOGY} element={<TypologyList />} />
      <Route path={ROUTES.TYPOLOGY_ID} element={<Typology />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}