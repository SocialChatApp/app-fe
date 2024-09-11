import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Guard from './components/Auth/Guard'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import LoginPage from './Pages/auth/LoginPage'
import RegisterPage from './Pages/auth/RegisterPage'
import MeetingPage from './Pages/home/MeetingPage'
import MainPage from './Pages/home/MainPage'
import UserProfile from './Pages/home/UserProfile'
import UserSettings from './Pages/home/UserSettings'


function App() {

  const user = {
    email: "test@mail.com",
    accessToken: "examleusersAccessToken"
  };

  // const user = undefined;


  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          {/* MAIN LAYOUT */}
          <Route path='*' element={<Navigate to="/" />} />
          <Route path='/' element={<Navigate to={user ? "/home/welcome" : "/auth/login"} replace />} />

          <Route path="/home" element={<MainLayout />} >

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

            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
