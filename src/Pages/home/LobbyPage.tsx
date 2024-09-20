import React, { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client';
import RoomList from '../../components/RoomList';
import { Box, Button, Stack, TextField } from '@mui/material';



interface LobbyProps {
    socket: Socket;
    setForm: React.Dispatch<React.SetStateAction<'lobby' | 'InRoom'>>;
}

function LobbyPage({ setForm, socket }: LobbyProps) {

    const [rooms, setRooms] = useState<string[]>([]);
    const [showCreateRoom, setShowCreateRoom] = useState<boolean>(false);
    const [newRoomName, setNewRoomName] = useState<string>('');

    useEffect(() => {

        socket.emit('getRooms');

        socket.on('roomList', (roomList: string[]) => {
            setRooms(roomList);
        });

    }, []);

    const createRoom = () => {
        if (newRoomName.trim()) {
            socket?.emit("createRoom", newRoomName);
            setNewRoomName('');
            setShowCreateRoom(false);
            setForm('InRoom');
        }
        else {
            alert('Room name cannot be empty');
        }
    }

    const cancelCreateRoom = () => {
        setNewRoomName('');
        setShowCreateRoom(false);
    };


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Box sx={{
                width: '10%',
                height: '100%',
            }}>
                <RoomList setForm={setForm} rooms={rooms} client={socket} />
            </Box>
            <Box
                sx={{
                    width: '90%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                {showCreateRoom ? (
                    <Stack spacing={2} alignItems="center">
                        <TextField
                            label="Room Name"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" onClick={createRoom}>Create Room</Button>
                            <Button variant="outlined" onClick={cancelCreateRoom}>Cancel</Button>
                        </Stack>
                    </Stack>
                ) : (
                    <Button variant="contained" onClick={() => setShowCreateRoom(true)}>Create Room</Button>
                )}
            </Box>
        </Box>
    );
}

export default LobbyPage
