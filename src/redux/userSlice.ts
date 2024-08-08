import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateUserDto } from '../dto/CreateUserDto'
import axios from 'axios';
import { LoginDto } from '../dto/LoginDto';
import { act } from 'react';
import { LoginResult } from '../dto/LoginResult';

const BASE_URL = "http://localhost:3000/users";
const AUTH_URL = "http://localhost:3000/auth";

const initialState: CreateUserDto = {
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
    searchType: '',
    accessToken: ''
}



export const createUser = createAsyncThunk<CreateUserDto, CreateUserDto>(
    'user/createUser',
    async (userObj) => {
        const response = await axios.post(`${BASE_URL}`, userObj);
        return response.data;
    }
);

export const fetchUserInfo = createAsyncThunk<CreateUserDto, string>(
    'user/fetchUserInfo',
    async (accessToken) => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await axios.get(`${AUTH_URL}/me`, { headers });
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



export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // builder.addCase(createUser.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
        //     state = action.payload;
        // });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResult>) => {
            state.accessToken = action.payload.AccesToken;
        });
        builder.addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
            const { id, name, surname, email, password, role, searchType } = action.payload;
            state.id = id;
            state.name = name;
            state.surname = surname;
            state.email = email;
            state.password = password;
            state.role = role;
            state.searchType = searchType;
            console.log(state.id);
            console.log(state.accessToken);
            console.log(state.name);
            console.log(state.surname);
            console.log(state.email);
            console.log(state.password);
            console.log(state.role);
            console.log(state.searchType);
        });
    },
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer