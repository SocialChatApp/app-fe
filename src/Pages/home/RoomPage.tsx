import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Typography, TextField, Button, Stack, Tooltip, IconButton, Avatar } from '@mui/material';
import { Socket } from 'socket.io-client';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface RoomPageProps {
    socket: Socket;
    setForm: React.Dispatch<React.SetStateAction<'lobby' | 'InRoom'>>;
}

function RoomPage({ setForm, socket }: RoomPageProps) {

    const [users, setUsers] = useState<{ name: string; avatarUrl: string; id: string }[]>([]);

    const [roomName, setRoomName] = useState<string>("");

    const [clientMessage, setClientMessage] = useState<string>('');

    const [messageList, setMessageList] = useState<{ name: string; avatarUrl: string; message: string; }[]>([]);

    const { info: userInfo } = useSelector((store: RootState) => store.user);

    useEffect(() => {

        socket.on('roomInfo', (data) => {
            setRoomName(data.roomName);
            setUsers(data.users);

            console.log('Room Info Update:', data);
        });

        socket.on('NewUserJoined', (user: { name: string; avatarUrl: string; id: string }) => {
            if (socket.id !== user.id)
                setUsers(prevUsers => [...prevUsers, user]);
        });

        socket.on('user-left', (clientId: string) => {
            console.log(`USER LEAEV ${clientId}`);
            console.log(users);
            setUsers(prevUsers => prevUsers.filter(u => u.id !== clientId));
        });

        socket.on('message', (payload: { sender: string, avatarUrl: string, message: string }) => {

            setMessageList((prevMessageList) => [
                ...prevMessageList,
                {
                    name: payload.sender,
                    avatarUrl: payload.avatarUrl,
                    message: payload.message,
                },
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
            sender: userInfo.name,
            avatarUrl: userInfo.avatarUrl,
            message: clientMessage
        };

        socket.emit('message', payload);

        setClientMessage('');
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
                                justifyContent: 'flex-start' // Soldan başlayacak şekilde ayarlandı
                            }}
                        >
                            <Avatar src={user.avatarUrl} alt={user.name} sx={{ marginRight: 2 }} /> {/* Avatar */}
                            {user.name} {/* Kullanıcı ismi */}
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
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: 1,
                            }}
                        >
                            <Avatar src={msg.avatarUrl} alt={msg.name} sx={{ marginRight: 2 }} /> {/* Avatar */}
                            <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
                                {msg.message}
                            </Typography>
                        </Box>
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
