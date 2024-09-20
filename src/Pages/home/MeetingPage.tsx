import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, Button, Skeleton, Stack, TextField } from '@mui/material';
import RoomList from '../../components/RoomList';
import { Socket, io } from 'socket.io-client';
import LobbyPage from './LobbyPage';
import RoomPage from './RoomPage';

let socket: Socket;


function MeetingPage() {
    const [loading, setLoading] = useState<boolean>(true);

    const { info: user } = useSelector((store: RootState) => store.user);

    useEffect(() => {

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
