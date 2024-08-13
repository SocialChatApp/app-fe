import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateUserDto } from '../dto/CreateUserDto'
import axios from 'axios';
import { LoginDto } from '../dto/LoginDto';
import { LoginResult } from '../dto/LoginResult';
import { UpdateUserDto } from '../dto/UpdateUserDto';

const BASE_URL = "http://localhost:3000/users";
const AUTH_URL = "http://localhost:3000/auth";

export interface User {
    info: CreateUserDto;
    accessToken: string;
    isAuth: boolean;
    isSignUp: boolean;
    isLoading: boolean;
}


const initialState: User = {
    info: {
        id: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        role: '',
        searchType: '',
        avatarUrl: ''
    },
    accessToken: '',
    isAuth: false,
    isSignUp: false,
    isLoading: false
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
        return response.data;
    }
);

export const loginUser = createAsyncThunk<LoginResult, LoginDto>(
    'user/loginUser',
    async (userObj, { dispatch }) => {
        const response = await axios.post(`${AUTH_URL}/login`, userObj);
        const loginResult = response.data;
        if (loginResult.AccesToken) {
            await dispatch(fetchUserInfo(loginResult.AccesToken));
        }
        return loginResult;
    }
);


export const uploadAvatar = createAsyncThunk(
    "user/uploadAvatar",
    async ({ img, userId }: { img: File, userId: string }) => {
        const formData = new FormData();
        formData.append('file', img);
        const url = `http://localhost:3000/cloud-storage/user/${userId}`;
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data);
        return response.data;
    }
);


export const updateUser = createAsyncThunk<UpdateUserDto, { userId: string; userObj: UpdateUserDto }>(
    "user/updateUser",
    async ({ userId, userObj }) => {
        const response = await axios.patch(`${BASE_URL}/${userId}`, userObj);
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {

    },
    extraReducers(builder) {

        builder.addCase(createUser.fulfilled, (state) => {
            state.isSignUp = true;
            state.isLoading = false;
        }).addCase(createUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(createUser.rejected, (state) => {
            state.isLoading = false;
        })


        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResult>) => {
            state.accessToken = action.payload.AccesToken;
            state.isLoading = false;
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
        })



        builder.addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
            const { id, name, surname, email, password, role, searchType, avatarUrl } = action.payload;
            state.info = { id, name, surname, email, password, role, searchType, avatarUrl };
            state.isAuth = true;
            state.isLoading = false;
        }).addCase(fetchUserInfo.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchUserInfo.rejected, (state) => {
            state.isLoading = false;
        })




        builder.addCase(uploadAvatar.fulfilled, (state, action) => {
            state.info.avatarUrl = action.payload;
            state.isLoading = false;
        }).addCase(uploadAvatar.pending, (state) => {
            state.isLoading = true;
        }).addCase(uploadAvatar.rejected, (state) => {
            state.isLoading = false;
        })
    },
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer