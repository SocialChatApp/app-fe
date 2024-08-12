import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostDto } from "../dto/CreatePostDto";
import axios from 'axios';
import { useSelector } from "react-redux";
import { RootState } from "./store";



export interface InitialState {
    posts: CreatePostDto[];
}

const initialState: InitialState = {
    posts: []
};

export const fetchAllPosts = createAsyncThunk(
    'post/fetchAllPosts',
    async (_, { getState }) => {
        const state = getState() as RootState;
        const accessToken = state.user.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };
        const uri = `http://localhost:3000/post/${state.user.info.id}`;

        const response = await axios.get(uri, { headers });
        return response.data;
    }
);

export const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
    }
});

export const { } = postSlice.actions

export default postSlice.reducer