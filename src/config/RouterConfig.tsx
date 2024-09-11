import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../Pages/auth/RegisterPage';
import MainPage from '../Pages/MainPage';
import LoginPage from '../Pages/auth/LoginPage';
import MeetingPage from '../Pages/MeetingPage';
import UserProfile from '../Pages/UserProfile';
import UserSettings from '../Pages/UserSettings';
import CreatePost from '../components/CreatePost';


function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<MainPage />} />

                <Route path='/meet-page' element={<MeetingPage />} />

                <Route path='/auth'>
                    <Route path='login' element={<LoginPage />} />
                    <Route path='register' element={<RegisterPage />} />
                </Route>

                <Route path='/user'>
                    <Route path='profile' element={<UserProfile />} />
                    <Route path='settings' element={<UserSettings />} />
                    <Route path='create-post' element={<CreatePost />} />
                </Route>


            </Routes>
        </div>
    )
}

export default RouterConfig