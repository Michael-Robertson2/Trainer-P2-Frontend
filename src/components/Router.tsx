import { Routes, Route } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

export default function Router() {
    return (
        <Routes>
            {/* public routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />

            {/* 404 page */}
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    );
}