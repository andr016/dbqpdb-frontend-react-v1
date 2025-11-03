import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
// Pages
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import SubjectPage from '../components/SubjectPage';
import AllSubjectsList from '../components/AllSubjectsList';
import TypologyList from '../components/TypologyList';
import LoginPage from '../components/LoginPage';
export const ROUTES = {
    HOME: '/',
    SUBJECT: '/subject',
    SUBJECT_ID: '/subject/:id',
    TYPOLOGY: '/typology',
    TYPOLOGY_ID: '/typology/:id',
    LOGIN: '/login',
};
export function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: ROUTES.HOME, element: _jsx(Home, {}) }), _jsx(Route, { path: ROUTES.SUBJECT, element: _jsx(AllSubjectsList, {}) }), _jsx(Route, { path: ROUTES.SUBJECT_ID, element: _jsx(SubjectPage, {}) }), _jsx(Route, { path: ROUTES.TYPOLOGY, element: _jsx(TypologyList, {}) }), _jsx(Route, { path: ROUTES.TYPOLOGY_ID, element: _jsx(TypologyList, {}) }), _jsx(Route, { path: ROUTES.LOGIN, element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }));
}
