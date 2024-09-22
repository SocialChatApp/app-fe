import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CreateCommentDto } from "../dto/CreateCommentDto";
import axios from 'axios';
import { RootState } from "./store";
import { CommentInfoDto } from "../dto/CommentInfoDto";
import { LogicOperation, checkAccesTokenIsValid, updateAuthInf } from "./authSlice";
import { setUser } from "./userSlice";
import Cookies from 'js-cookie';
import { CreateUserDto } from "../dto/CreateUserDto";


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


export interface commentSliceProps {
    isLoading: boolean;
}

const initialState: commentSliceProps = {
    isLoading: false
}

const BASE_URL = `http://localhost:3000/comment`

export const createComment = createAsyncThunk(
    "comment/create",
    async (commentDto: CreateCommentDto, { getState, dispatch }) => {

        await checkTokenValidity(dispatch);

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.post(BASE_URL, commentDto, { headers });

        return response.data;
    }
);


export const fetchAllComments = createAsyncThunk<CommentInfoDto[], string>(
    "comment/fetchAll",
    async (postId: string, { getState, dispatch }) => {

        await checkTokenValidity(dispatch);

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.get(`${BASE_URL}/${postId}`, { headers });

        return response.data;
    }
);

export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    async (commentId: string, { getState, dispatch }) => {

        await checkTokenValidity(dispatch);

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.delete(`${BASE_URL}/${commentId}`, { headers });

        return response.data;
    }
);



const checkTokenValidity = async (dispatch: any) => {
    const isValid = await dispatch(checkAccesTokenIsValid()).unwrap();
    if (!isValid) {
        alert('Your session has timed out. Please log in again.');
        Cookies.remove('authInf');
        dispatch(setUser(userState));
        dispatch(updateAuthInf(authState));
        window.location.href = '/auth/signin';
        throw new Error('Session timed out');
    }
};




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