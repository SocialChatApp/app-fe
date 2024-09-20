import { Button, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { Socket } from 'socket.io-client'

interface roomProps {
    client: Socket | null;
    rooms: string[]
    setForm: Dispatch<SetStateAction<'lobby' | 'InRoom'>>;
}

function RoomList({ rooms, client, setForm }: roomProps) {

    const joinRoom = (roomName: string) => {
        client?.emit('joinRoom', roomName);
        setForm('InRoom');
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            width: '200px',
            height: '100vh',
            alignItems: 'center'
        }}>
            <Typography variant="h6" component="h2" style={{ marginBottom: '20px' }}>
                Available Rooms
            </Typography>
            {rooms && rooms.map((room, index) => (
                <Button key={index} variant="contained" onClick={() => { joinRoom(room) }} style={{ marginBottom: '10px' }}>
                    {room}
                </Button>
            ))}
        </div>
    );
}

export default RoomList
