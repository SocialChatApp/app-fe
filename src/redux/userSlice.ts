import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateUserDto } from '../dto/CreateUserDto'
import axios from 'axios';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { RootState } from './store';
import { UserInfoDto } from '../dto/UserInfoDto';
import Cookies from 'js-cookie';
import { LogicOperation, checkAccesTokenIsValid, saveCookie, updateAuthInf } from './authSlice';


const BASE_URL = "http://localhost:3000/users";

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
    userInf: userState,
    userCreated: false,
    accessToken: "",
    isAuth: false,
    isLoading: false
};


export interface User {
    info: CreateUserDto;
    isSignUp: boolean;
    isLoading: boolean;
}


const initialState: User = {
    info: userState,
    isSignUp: false,
    isLoading: false
};

//token ekle headers
export const fetchAllUsers = createAsyncThunk<UserInfoDto[]>(
    "user/fetchAll",
    async (_, { getState, dispatch }) => {

        await checkTokenValidity(dispatch);

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
    async ({ img, userId }: { img: File, userId: string }, { getState, dispatch }) => {

        await checkTokenValidity(dispatch);


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
    async ({ userId, userObj }, { getState, dispatch }) => {

        await checkTokenValidity(dispatch);


        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.patch(`${BASE_URL}/${userId}`, userObj, { headers });

        await dispatch(fetchUserInfo(userId)).unwrap();
        dispatch(saveCookie());

        return response.data;
    }
);

export const fetchUserInfo = createAsyncThunk<CreateUserDto, string>(
    "user,fetchUser",
    async (userId, { getState, dispatch }) => {

        await checkTokenValidity(dispatch);



        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.get(`${BASE_URL}/${userId}`, { headers });
        return response.data;
    }
)

export const fetchInfoForMedia = createAsyncThunk<CreateUserDto, string>(
    "user,fetchInfoForMedia",
    async (userId, { getState, dispatch }) => {

        await checkTokenValidity(dispatch);

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.get(`${BASE_URL}/${userId}`, { headers });
        return response.data;
    }
)



const checkTokenValidity = async (dispatch: any) => {
    const isValid = await dispatch(checkAccesTokenIsValid()).unwrap();
    console.log(isValid);
    if (!isValid) {
        alert('Your session has timed out. Please log in again.');
        Cookies.remove('authInf');
        dispatch(setUser(userState));
        dispatch(updateAuthInf(authState));
        window.location.href = '/auth/signin';
        throw new Error('Session timed out');
    }
};



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
            state.isLoading = false;
        }).addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isSignUp = false;
        }).addCase(createUser.rejected, (state) => {
            state.isLoading = false;
            state.isSignUp = false;
        })

        builder.addCase(uploadAvatar.fulfilled, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.info.avatarUrl = action.payload;
        }).addCase(uploadAvatar.pending, (state) => {
            state.isLoading = true;
        }).addCase(uploadAvatar.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.error);
        })

        builder.addCase(updateUser.fulfilled, (state) => {
            state.isLoading = false;
            // NO CONTENT RETURN FROM API
        }).addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.error);
        })

        builder.addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
            //state.info = action.payload;
            //state.info.name=action.payload.name;
            state.isLoading = false;
            state.info.name = action.payload.name;
            state.info.surname = action.payload.surname;
            state.info.email = action.payload.email;
            state.info.password = action.payload.password;
            state.info.role = action.payload.role;
            state.info.searchType = action.payload.searchType;
            state.info.avatarUrl = action.payload.avatarUrl;

        }).addCase(fetchUserInfo.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchUserInfo.rejected, (state) => {
            state.isLoading = false;
        })

        builder.addCase(fetchInfoForMedia.fulfilled, (state) => {
            state.isLoading = false;
        }).addCase(fetchInfoForMedia.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchInfoForMedia.rejected, (state) => {
            state.isLoading = false;
        })
    }
},
)

export const { setUser } = userSlice.actions

export default userSlice.reducer