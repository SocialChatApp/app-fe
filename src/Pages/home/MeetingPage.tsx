import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Box } from '@mui/material';
import { Socket, io } from 'socket.io-client';
import LobbyPage from './LobbyPage';
import RoomPage from './RoomPage';
import { LogicOperation, checkAccesTokenIsValid, updateAuthInf } from '../../redux/authSlice';
import Cookies from 'js-cookie';
import { CreateUserDto } from '../../dto/CreateUserDto';
import { setUser } from '../../redux/userSlice';


const userState: CreateUserDto = {
    id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
    searchType: '',
    avatarUrl: ''
};

const authState: LogicOperation = {
    authPage: "login",
    userInf: userState,
    userCreated: false,
    accessToken: "",
    isAuth: false,
    isLoading: false
};

let socket: Socket;


function MeetingPage() {
    const dispatch = useDispatch<AppDispatch>();

    const [loading, setLoading] = useState<boolean>(true);

    const { info: user } = useSelector((store: RootState) => store.user);

    const checkToken = async () => {
        const isValid = await dispatch(checkAccesTokenIsValid()).unwrap();
        if (!isValid) {
            Cookies.remove('authInf');
            dispatch(setUser(userState));
            dispatch(updateAuthInf(authState));
            window.location.href = '/auth/signin';
            throw new Error('Session timed out');
        }
    }

    useEffect(() => {


        checkToken();

        socket = io('http://localhost:4000');

        socket.on('connect', () => {
            setLoading(false);
            const userInfo = {
                name: user.name,
                avatarUrl: user.avatarUrl,
            };
            socket.emit('setUserInfo', userInfo);
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        }

    }, []);


    const [form, setForm] = useState<'lobby' | 'InRoom'>('lobby');

    const renderForm = () => {
        switch (form) {
            case 'lobby':
                return <LobbyPage setForm={setForm} socket={socket} />;
            case 'InRoom':
                return <RoomPage setForm={setForm} socket={socket} />;
        }
    };

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Box >
            {renderForm()}
        </Box>
    );
}

export default MeetingPage;
