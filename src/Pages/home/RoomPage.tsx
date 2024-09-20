import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Typography, TextField, Button, Stack, Tooltip, IconButton } from '@mui/material';
import { Socket } from 'socket.io-client';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface RoomPageProps {
    socket: Socket;
    setForm: React.Dispatch<React.SetStateAction<'lobby' | 'InRoom'>>;
}


function RoomPage({ setForm, socket }: RoomPageProps) {

    const [users, setUsers] = useState<string[]>([]);
    const [roomName, setRoomName] = useState<string>("");

    const [clientMessage, setClientMessage] = useState<string>('');

    const [messageList, setMessageList] = useState<string[]>([]);

    useEffect(() => {

        socket.on('roomInfo', (data: { roomName: string, users: string[] }) => {
            setRoomName(data.roomName);
            setUsers(data.users);

            console.log('ROM INFO UPDATE');

        });

        socket.on('NewUserJoined', (user: string) => {
            setUsers(prevUsers => [...prevUsers, user]);
        });

        socket.on('user-left', (user: string) => {
            setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
        });

        socket.on('message', (payload: { sender: string, message: string }) => {

            setMessageList((prevMessageList) => [
                ...prevMessageList,
                `${payload.sender}: ${payload.message}`
            ]);
        });


        socket.on('disconnect', () => {

        })


    }, [socket]);


    const leaveRoom = (roomName: string) => {
        socket.emit('leave-room', roomName);
        setForm('lobby');
    }

    const sendMessage = () => {

        const payload = {
            roomName,
            sender: socket.id,
            message: clientMessage
        };

        socket.emit('message', payload);

        setClientMessage('');
    }

    const handleMessage = (data: { sender: string, message: string }) => {

    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100vh',
                justifyContent: 'space-between',
                padding: 2
            }}
        >
            {/* Kullanıcıları listeleyecek olan sol tarafa yapışık Box */}
            <Box
                sx={{
                    width: '20%',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    borderRight: '1px solid #ccc',
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography variant="h6" textAlign='center' gutterBottom>
                    {roomName} : Users
                </Typography>

                <Tooltip title="Leave Room" arrow>
                    <IconButton
                        color="primary"
                        sx={{
                            position: 'absolute',
                        }}
                        onClick={() => {
                            leaveRoom(roomName)
                        }}
                    >
                        <ExitToAppIcon />
                    </IconButton>
                </Tooltip>
                <List>
                    {users && users.map((user, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                borderRadius: '4px',
                                marginBottom: 1,
                                justifyContent: 'center'
                            }}
                        >
                            {user}
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Mesajlaşma alanı olacak sağ tarafa yapışık Box */}
            <Box
                sx={{
                    width: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 2
                }}
            >
                {/* Mesajları gösteren kısım */}
                <Box
                    sx={{
                        flexGrow: 1,
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        padding: 2,
                        overflowY: 'auto',
                        marginBottom: 2
                    }}
                >
                    {messageList.map((msg, index) => (
                        <Typography key={index} variant="body1">
                            {msg}
                        </Typography>
                    ))}
                </Box>

                {/* Mesaj yazma alanı */}
                <Stack direction="row" spacing={2}>
                    <TextField
                        fullWidth
                        label="Type your message..."
                        variant="outlined"
                        value={clientMessage}
                        onChange={(e) => {
                            setClientMessage(e.target.value);
                        }}
                    />
                    <Button variant="contained" onClick={sendMessage}>Send</Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default RoomPage;
