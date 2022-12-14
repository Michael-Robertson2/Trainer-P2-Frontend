import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import LoadinPage from '../pages/LoadingPage';
import LoginPage from '../pages/LoginPage';
import RestaurantPage from '../pages/RestaurantPage';
import RestaurantsPage from '../pages/RestaurantsPage';
import SignupPage from '../pages/SignupPage';

export default function Router() {
    return (
        <Routes>
            {/* public routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/restaurants' element={<RestaurantsPage />} />
            <Route path='/restaurant/:id' element={<RestaurantPage />} />

            {/* 404 page */}
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    );
}