import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import '../App.css'
import { LogicOperation, updateAuthInf } from '../redux/authSlice';
import { CreateUserDto } from '../dto/CreateUserDto';
import { setUser } from '../redux/userSlice';
import Cookies from 'js-cookie';

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
    userInf: {
        id: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        role: '',
        searchType: '',
        avatarUrl: ''
    },
    userCreated: false,
    accessToken: "",
    isAuth: false,
    isLoading: false
};



const pages = ['Meeting', "Media"];
const settings: PageData[] = [
    {
        name: 'Profile',
        path: 'user'
    },
    {
        name: 'Settings',
        path: 'settings'
    },
    {
        name: 'Logout',
        path: 'logout'
    }
];

interface PageData {
    name: string;
    path: string;
}

function Header() {
    const navigate = useNavigate();
    const { isAuth } = useSelector((store: RootState) => store.auth);
    const { info: user } = useSelector((store: RootState) => store.user);

    useEffect(() => {

    }, [user]);

    const dispatch = useDispatch<AppDispatch>();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        Cookies.remove('authInf');
        dispatch(setUser(userState));
        dispatch(updateAuthInf(authState));
        window.location.href = '/auth/signin';
    }

    return (
        <AppBar position="static" style={{
            backgroundColor: '#ADA2FF',
            marginBottom: 20
        }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to='/' className='LinkButton'>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#FFE5F1',
                                textDecoration: 'none',
                            }}
                        >
                            Friend Fusion
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {isAuth ? (
                                pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link to={page.toLowerCase()} className='LinkButton'>
                                            <Typography textAlign="center">{page}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))
                            ) : (
                                <>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to="/auth/signin" className='LinkButton'>
                                            <Typography style={{ fontFamily: 'monospace' }} textAlign="center">Sign In</Typography>
                                        </Link>
                                    </MenuItem>
                                </>
                            )}

                        </Menu>
                    </Box>

                    <Link to="/" className='LinkButton'>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Friend Fusion
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                        {isAuth ? (
                            pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        navigate(page.toLowerCase());
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))
                        ) : (
                            <Box>
                                <Button color="inherit" style={{ fontFamily: 'monospace' }} onClick={() => {
                                    navigate('/auth/signin')
                                }}>Sign In</Button>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {isAuth && (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar src={`${user.avatarUrl}?t=${new Date().getTime()}`} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                            <Link to={setting.path.toLowerCase()}
                                                onClick={() => {
                                                    if (setting.name === 'Logout') {
                                                        handleLogout();
                                                    }
                                                }}
                                                className='LinkButton'>
                                                <Typography textAlign="center">{setting.name}</Typography>
                                            </Link>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
