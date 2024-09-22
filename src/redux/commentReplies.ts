import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios';
import { RootState } from "./store";
import { CreateCommentReplyDto } from "../dto/CreateCommentReplyDto";
import { CommentReplyInfoDto } from "../dto/CommentReplyInfoDto";

interface replyLogicOperation {
    isLoading: boolean;
}

const initialState: replyLogicOperation = {
    isLoading: false
}

const BASE_URL = `http://localhost:3000/reply`;


export const createCommentReply = createAsyncThunk(
    "commentReply/create",
    async (replyDto: CreateCommentReplyDto, { getState }) => {
        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.post(BASE_URL, replyDto, { headers });
        return response.data;
    }
);

export const deleteCommentReply = createAsyncThunk(
    "commentReply/delete",
    async (replyId: String, { getState }) => {
        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        await axios.delete(`${BASE_URL}/${replyId}`, { headers });
        // NO CONTENT RETURN
    }
);

export const fetchAllCommentReply = createAsyncThunk<CommentReplyInfoDto[], string>(
    "commentReply/fetchAll",
    async (commentId: string, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.get(`${BASE_URL}/${commentId}`, { headers });
        return response.data as CommentReplyInfoDto[];
    }
);

export const findOneReply = createAsyncThunk(
    "commentReply/findOne",
    async (replyId: string, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        return await axios.get(`${BASE_URL}/${replyId}`, { headers });
    }
);


export const commentRepliesSlice = createSlice({
    name: 'commentRepliesSlice',
    initialState,
    reducers: {

    },
    extraReducers(builder) {


        builder.addCase(createCommentReply.fulfilled, (state, action) => {
            state.isLoading = false;
            //payload return just commentReply id
        }).addCase(createCommentReply.pending, (state) => {
            state.isLoading = true;
        }).addCase(createCommentReply.rejected, (state) => {
            state.isLoading = false;
        })

        builder.addCase(deleteCommentReply.fulfilled, (state) => {
            //NO CONTENT
            state.isLoading = false;
        }).addCase(deleteCommentReply.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCommentReply.rejected, (state) => {
            state.isLoading = false;
        })

        builder.addCase(fetchAllCommentReply.fulfilled, (state) => {
            //Return CommentReplyInfoDto[]
            state.isLoading = false;
        }).addCase(fetchAllCommentReply.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllCommentReply.rejected, (state) => {
            state.isLoading = false;
        })

        builder.addCase(findOneReply.fulfilled, (state) => {
            //Return Just One CommentReplyInfoDto
            state.isLoading = false;
        }).addCase(findOneReply.pending, (state) => {
            state.isLoading = true;
        }).addCase(findOneReply.rejected, (state) => {
            state.isLoading = false;
        })

    },
});


export const { } = commentRepliesSlice.actions;
export default commentRepliesSlice.reducer;


