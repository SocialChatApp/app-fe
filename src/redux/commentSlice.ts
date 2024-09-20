import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CreateCommentDto } from "../dto/CreateCommentDto";
import axios from 'axios';
import { RootState } from "./store";
import { CommentInfoDto } from "../dto/CommentInfoDto";


export interface commentSliceProps {
    isLoading: boolean;
}

const initialState: commentSliceProps = {
    isLoading: false
}

const BASE_URL = `http://localhost:3000/comment`

export const createComment = createAsyncThunk(
    "comment/create",
    async (commentDto: CreateCommentDto, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.post(BASE_URL, commentDto, { headers });

        return response.data;
    }
);


export const fetchAllComments = createAsyncThunk<CommentInfoDto[], string>(
    "comment/fetchAll",
    async (postId: string, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.get(`${BASE_URL}/${postId}`, { headers });

        return response.data;
    }
);




export const commentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {

    },
    extraReducers(builder) {

        builder.addCase(createComment.fulfilled, (state) => {
            state.isLoading = false;
        }).addCase(createComment.pending, (state) => {
            state.isLoading = true;
        }).addCase(createComment.rejected, (state) => {
            state.isLoading = false;
        })

        builder.addCase(fetchAllComments.fulfilled, () => {

        })

    },
});


export const { } = commentSlice.actions

export default commentSlice.reducer