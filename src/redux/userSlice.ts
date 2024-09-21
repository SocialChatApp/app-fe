import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateUserDto } from '../dto/CreateUserDto'
import axios from 'axios';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { RootState } from './store';
import { UserInfoDto } from '../dto/UserInfoDto';


const BASE_URL = "http://localhost:3000/users";

export interface User {
    info: CreateUserDto;
    isSignUp: boolean;
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
    isSignUp: false,
};

//token ekle headers
export const fetchAllUsers = createAsyncThunk<UserInfoDto[]>(
    "user/fetchAll",
    async (_, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.get(`${BASE_URL}`, { headers });
        return response.data as UserInfoDto[];
    }
);




export const createUser = createAsyncThunk<CreateUserDto, CreateUserDto>(
    'user/createUser',
    async (userObj) => {
        const response = await axios.post(`${BASE_URL}`, userObj);
        return response.data;
    }
);

export const uploadAvatar = createAsyncThunk(
    "user/uploadAvatar",
    async ({ img, userId }: { img: File, userId: string }, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',

        };

        const formData = new FormData();
        formData.append('file', img);
        const url = `http://localhost:3000/cloud-storage/user/${userId}`;
        const response = await axios.post(url, formData, { headers });

        return response.data;
    }
);


export const updateUser = createAsyncThunk<CreateUserDto, { userId: string; userObj: UpdateUserDto }>(
    "user/updateUser",
    async ({ userId, userObj }, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.patch(`${BASE_URL}/${userId}`, userObj, { headers });
        await fetchUserInfo(userId);
        return response.data;
    }
);

export const fetchUserInfo = createAsyncThunk<CreateUserDto, string>(
    "user,fetchUser",
    async (userId, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.get(`${BASE_URL}/${userId}`, { headers });
        return response.data;
    }
)

export const fetchInfoForMedia = createAsyncThunk<CreateUserDto, string>(
    "user,fetchInfoForMedia",
    async (userId, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.get(`${BASE_URL}/${userId}`, { headers });
        return response.data;
    }
)




export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<CreateUserDto>) {
            state.info.id = action.payload.id;
            state.info.name = action.payload.name;
            state.info.surname = action.payload.surname;
            state.info.email = action.payload.email;
            state.info.password = action.payload.password;
            state.info.role = action.payload.role;
            state.info.searchType = action.payload.searchType;
            state.info.avatarUrl = action.payload.avatarUrl;
        },
    },
    extraReducers(builder) {

        builder.addCase(createUser.fulfilled, (state) => {
            state.isSignUp = true;
        }).addCase(createUser.pending, (state) => {
            state.isSignUp = false;
        }).addCase(createUser.rejected, (state) => {
            state.isSignUp = false;
        })

        builder.addCase(uploadAvatar.fulfilled, (state, action: PayloadAction<string>) => {
            state.info.avatarUrl = action.payload;
        }).addCase(uploadAvatar.pending, () => {
        }).addCase(uploadAvatar.rejected, (state, action) => {
            console.log(action.error);
        })

        builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
            // NO CONTENT RETURN FROM API
        })

        builder.addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
            state.info = action.payload;
        })

        builder.addCase(fetchInfoForMedia.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {

        })
    }
},
)

export const { setUser } = userSlice.actions

export default userSlice.reducer