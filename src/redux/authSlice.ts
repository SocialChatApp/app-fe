import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginResult } from "../dto/LoginResult";
import { LoginDto } from "../dto/LoginDto";
import axios from 'axios';
import { CreateUserDto } from "../dto/CreateUserDto";
import { EmailDto } from "../dto/EmailDto";
import { VerificationDto } from "../dto/VerificationDto";
import { createUser, setUser } from "./userSlice";
import Cookies from 'js-cookie';
import { RootState } from "./store";


const AUTH_URL = "http://localhost:3000/auth";


export interface LogicOperation {
    authPage: '2FA' | 'register' | 'login';
    userInf: CreateUserDto;
    userCreated: boolean;
    accessToken: string;
    isAuth: boolean;
    isLoading: boolean;
}


const initialState: LogicOperation = {
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

export const sendTokenToMail = createAsyncThunk(
    "auth/token",
    async ({ mailDto, userDto }: { mailDto: EmailDto; userDto: CreateUserDto }) => {

        const response = await axios.post(`${AUTH_URL}/token`, mailDto);
        return { data: response.data, userDto };
    }
);


export const verifyToken = createAsyncThunk(
    "auth/verify",
    async (verificationDto: VerificationDto, { dispatch, getState }) => {
        const response = await axios.post(`${AUTH_URL}/verify`, verificationDto);
        if (response.data as true) {
            const state = getState() as { auth: LogicOperation };
            const userInfoCache = state.auth.userInf;
            if (userInfoCache) {
                await dispatch(createUser(userInfoCache))
                const loginDto: LoginDto = {
                    email: userInfoCache.email,
                    password: userInfoCache.password
                };
                await dispatch(login(loginDto));
            }
        }
        return response.data;
    }
);

const emptyUser: CreateUserDto = {
    id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
    searchType: '',
    avatarUrl: ''
};



export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { dispatch, getState }) => {

        const state = getState() as RootState;
        state.auth.accessToken = "";
        state.auth.isAuth = false;
        state.auth.userInf = emptyUser;
        state.auth.authPage = 'login';

        dispatch(setUser(emptyUser));

        Cookies.remove('authInf');
        localStorage.removeItem('authInf');
        sessionStorage.removeItem('authInf');
    }
);



export const login = createAsyncThunk<LoginResult, LoginDto>(
    'auth/loginUser',
    async (userObj, { dispatch }) => {
        const response = await axios.post(`${AUTH_URL}/login`, userObj);
        const loginResult = response.data;

        await dispatch(GetMe({ Authorization: `Bearer ${loginResult.AccesToken}` }));

        return loginResult;
    }
);

export const GetMe = createAsyncThunk<CreateUserDto, { Authorization: string }>(
    'auth/me',
    async (obj, { dispatch }) => {


        const response = await axios.get(`${AUTH_URL}/me`, {
            headers: {
                Authorization: obj.Authorization,
            },
        });

        const userInfo = response.data as CreateUserDto;

        await dispatch(setUser(userInfo));


        return response.data as CreateUserDto;
    }
);


export const checkAccesTokenIsValid = createAsyncThunk<boolean, void, { state: RootState }>(
    'auth/checkAccessToken',
    async (_, { getState }) => {
        const state = getState();
        const accessToken = state.auth.accessToken;

        const tokenObj = {
            "accessToken": accessToken
        };

        const response = await axios.post(`${AUTH_URL}/accessToken`, tokenObj);

        return response.data.isValid;
    }
);




export const authSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        updateAuthInf: (state, action: PayloadAction<LogicOperation>) => {
            state.accessToken = action.payload.accessToken;
            state.userInf = action.payload.userInf;
            state.isAuth = true;
        },
        saveCookie: (state, action: PayloadAction<CreateUserDto>) => {
            Cookies.set('authInf', JSON.stringify(state), { expires: 7 });
        }
    },
    extraReducers(builder) {

        builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResult>) => {
            state.accessToken = action.payload.AccesToken;
            state.isLoading = false;
            state.isAuth = true;
            Cookies.set('authInf', JSON.stringify(state), { expires: 7 });

        }), builder.addCase(login.pending, (state) => {
            state.isLoading = true;

        }), builder.addCase(login.rejected, (state, action) => {
            state.isLoading = true;
            console.log(action.error);
        })


        builder.addCase(sendTokenToMail.fulfilled, (state, action) => {
            state.userInf = action.payload.userDto;
            state.authPage = '2FA';
            state.isLoading = false;
        }), builder.addCase(sendTokenToMail.pending, (state) => {
            state.isLoading = true;
        }), builder.addCase(sendTokenToMail.rejected, (state, action) => {
            state.isLoading = true;
            console.log(action.error);
        })


        builder.addCase(verifyToken.fulfilled, (state, action) => {
            state.userCreated = action.payload;

        }), builder.addCase(verifyToken.pending, (state) => {
            state.userCreated = false;

        }), builder.addCase(verifyToken.rejected, (state, action) => {
            state.userCreated = false;
            console.log(action.payload);
        })

        builder.addCase(GetMe.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
            const { id, name, surname, email, password, role, searchType, avatarUrl } = action.payload;
            state.userInf = { id, name, surname, email, password, role, searchType, avatarUrl };
            state.isLoading = false;
            state.isAuth = true;

            Cookies.set('authInf', JSON.stringify(state), { expires: 7 });
            console.log(`COOKİE KAYDEDİLDİ ${state.accessToken}`);

        }), builder.addCase(GetMe.pending, (state) => {
            state.isLoading = true;

        }), builder.addCase(GetMe.rejected, (state, action) => {
            state.isLoading = true;
            console.log(action.error);
        })
    },
},
)

export const { updateAuthInf, saveCookie } = authSlice.actions

export default authSlice.reducer