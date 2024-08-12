import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateUserDto } from '../dto/CreateUserDto'
import axios from 'axios';
import { LoginDto } from '../dto/LoginDto';
import { LoginResult } from '../dto/LoginResult';

const BASE_URL = "http://localhost:3000/users";
const AUTH_URL = "http://localhost:3000/auth";

export interface User {
    info: CreateUserDto;
    accessToken: string;
    isAuth: boolean;
    isSignUp: boolean;
}


const initialState: User = {
    info: {
        name: '',
        surname: '',
        email: '',
        password: '',
        role: '',
        searchType: '',
    },
    accessToken: '',
    isAuth: false,
    isSignUp: false
};



export const createUser = createAsyncThunk<CreateUserDto, CreateUserDto>(
    'user/createUser',
    async (userObj) => {
        const response = await axios.post(`${BASE_URL}`, userObj);
        // if (response.status == 200)
        return response.data;
    }
);

const fetchUserInfo = createAsyncThunk<CreateUserDto, string>(
    'user/fetchUserInfo',
    async (accessToken) => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await axios.get(`${AUTH_URL}/me`, { headers });
        console.log(response.data);
        return response.data;
    }
);

export const loginUser = createAsyncThunk<LoginResult, LoginDto>(
    'user/loginUser',
    async (userObj, { dispatch }) => {
        const response = await axios.post(`${AUTH_URL}/login`, userObj);
        const loginResult = response.data;
        if (loginResult.AccesToken) {
            dispatch(fetchUserInfo(loginResult.AccesToken));
        }
        return loginResult;
    }
);


export const updateAvatar = createAsyncThunk(
    "user/updateAvatar",
    async ({ img, userId }: { img: File, userId: string }) => {
        const formData = new FormData();
        formData.append('file', img);
        const url = `http://localhost:3000/cloud-storage/user/${userId}`;
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(url);
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(createUser.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
            state.isSignUp = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResult>) => {
            state.accessToken = action.payload.AccesToken;
        });
        builder.addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
            const { id, name, surname, email, password, role, searchType } = action.payload;
            state.info = { id, name, surname, email, password, role, searchType };
            state.isAuth = true;
        });
        builder.addCase(updateAvatar.fulfilled, (state, action) => {
            console.log('Fotoğraf cloud-storage yüklendi');
        })
    },
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer