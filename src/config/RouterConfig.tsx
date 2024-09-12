import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '../Pages/auth/RegisterPage';
import AuthLayout from '../layouts/AuthLayout';
import Guard from '../components/Auth/Guard';
import MainLayout from '../layouts/MainLayout';
import UserProfile from '../Pages/home/UserProfile';
import MainPage from '../Pages/home/MainPage';
import LoginPage from '../Pages/auth/LoginPage';
import UserSettings from '../Pages/home/UserSettings';
import MeetingPage from '../Pages/home/MeetingPage';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


function RouterConfig() {

    const userInfoFromStore = useSelector((store: RootState) => store.user);
    const user = {
        email: userInfoFromStore.info.email,
        accessToken: userInfoFromStore.accessToken
    };

    return (
        <Routes>
            {/* MAIN LAYOUT */}
            <Route path='*' element={<Navigate to="/" />} />
            <Route path='/' element={<Navigate to={user ? "/home/welcome" : "/auth/login"} replace />} />

            <Route path="/home" element={<MainLayout />} >
                <Route index element={<Navigate to="welcome" />} />

                {/* MAIN LAYOUT - PRIVATE PAGES */}
                <Route index path='meeting' element={
                    <Guard>
                        <MeetingPage />
                    </Guard>
                } />
                <Route index path='settings' element={
                    <Guard>
                        <UserSettings />
                    </Guard>
                } />

                {/* MAIN LAYOUT - PUBLIC PAGES */}
                <Route path='welcome' element={<MainPage />} />
                <Route path='user' element={<UserProfile />} />
            </Route>

            {/* AUTH LAYOUT */}
            <Route path='/auth' element={<AuthLayout />} >
                <Route index element={<Navigate to="register" />} />

                <Route path='register' element={<RegisterPage />} />
                <Route path='login' element={<LoginPage />} />
            </Route>

        </Routes>
    )
}

export default RouterConfig