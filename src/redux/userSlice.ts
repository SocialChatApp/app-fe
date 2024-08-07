import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateUserDto } from '../dto/CreateUserDto'
import axios from 'axios';

const BASE_URL = "http://localhost:3000/users";

const initialState: CreateUserDto = {
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
    searchType: ''
}

export const createUser = createAsyncThunk<CreateUserDto, CreateUserDto>(
    'user/createUser',
    async (userObj) => {
        const response = await axios.post(`${BASE_URL}`, userObj);
        return response.data;
    }
);



export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(createUser.fulfilled, (state, action) => {
            state = action.payload;
        })
    },
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer