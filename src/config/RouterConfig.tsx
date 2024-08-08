import React from 'react'
import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../Pages/RegisterPage';
import MainPage from '../Pages/MainPage';
import LoginPage from '../Pages/LoginPage';


function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/auth/login' element={<LoginPage />} />
                <Route path='/auth/register' element={<RegisterPage />} />
            </Routes>
        </div>
    )
}

export default RouterConfig