import { PayloadAction, Update, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateUserDto } from '../dto/CreateUserDto'
import axios from 'axios';
import { UpdateUserDto } from '../dto/UpdateUserDto';

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



export const createUser = createAsyncThunk<CreateUserDto, CreateUserDto>(
    'user/createUser',
    async (userObj) => {
        const response = await axios.post(`${BASE_URL}`, userObj);
        //const { id } = response.data;
        return response.data;
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


export const updateUser = createAsyncThunk<CreateUserDto, { userId: string; userObj: UpdateUserDto }>(
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
        }).addCase(createUser.pending, (state) => {
            state.isSignUp = false;
        }).addCase(createUser.rejected, (state) => {
            state.isSignUp = false;
        })

        builder.addCase(uploadAvatar.fulfilled, (state, action) => {
            state.info.avatarUrl = action.payload;
        }).addCase(uploadAvatar.pending, () => {
        }).addCase(uploadAvatar.rejected, (state, action) => {
            console.log(action.error);
        })

        builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
            state.info = action.payload;
        })
    }
},
)

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer