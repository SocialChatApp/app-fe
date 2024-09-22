import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Guard from '../components/Auth/Guard';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import AuthPageContainer from '../Pages/auth/AuthPageContainer';
import MainPage from '../Pages/home/MainPage';
import UserProfile from '../Pages/home/UserProfile';
import UserSettings from '../Pages/home/UserSettings';
import MeetingPage from '../Pages/home/MeetingPage';
import { useSelector } from 'react-redux';
import CreatePost from '../components/CreatePost';
import MediaPage from '../Pages/home/MediaPage';
import UserDetails from '../Pages/home/UserDetails';
import { RootState } from '../redux/store';




function RouterConfig() {

    const { info: user } = useSelector((store: RootState) => store.user);

    return (
        <Routes>
            {/* MAIN LAYOUT */}
            <Route path='*' element={<Navigate to="/" />} />
            <Route path='/' element={<Navigate to={user ? "/home/welcome" : "/auth/signin"} replace />} />

            <Route path="/home" element={<MainLayout />} >
                <Route index element={<Navigate to="welcome" />} />

                {/* MAIN LAYOUT - PRIVATE PAGES */}
                <Route index path='meeting' element={
                    <Guard>
                        <MeetingPage />
                    </Guard>
                } />

                <Route index path='media' element={
                    <Guard>
                        <MediaPage />
                    </Guard>
                } />

                <Route index path='user-detail/:id' element={
                    <Guard>
                        <UserDetails />
                    </Guard>
                } />

                <Route index path='settings' element={
                    <Guard>
                        <UserSettings />
                    </Guard>
                } />
                <Route path='create-post' element={
                    <Guard>
                        <CreatePost />
                    </Guard>
                } />

                {/* MAIN LAYOUT - PUBLIC PAGES */}
                <Route path='welcome' element={<MainPage />} />
                <Route path='user' element={
                    <Guard>
                        <UserProfile />
                    </Guard>
                } />
            </Route>

            {/* AUTH LAYOUT */}
            <Route path='/auth' element={<AuthLayout />} >
                <Route index element={<Navigate to="signin" />} />

                <Route path='signin' element={<AuthPageContainer />} />
            </Route>

        </Routes>
    )
}

export default RouterConfig