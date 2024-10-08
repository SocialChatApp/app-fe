import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostDto } from "../dto/CreatePostDto";
import axios from 'axios';
import { RootState } from "./store";
import { UpdatePostDto } from "../dto/UpdatePostDto";
import { PostInfoDto } from "../dto/PostInfoDto";
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

export interface InitialState {
    posts: CreatePostDto[];
    isLoading: boolean;
}

const initialState: InitialState = {
    posts: [],
    isLoading: false
};

const BASE_URL = "http://localhost:3000/post/";
const CLOUD_STORAGE_BASE_URL = "http://localhost:3000/cloud-storage/posts/";


export const fetchAllPosts = createAsyncThunk<PostInfoDto[]>(
    "post/fetchAllPosts",
    async (_, { getState, dispatch }) => {

        await checkTokenValidity(dispatch);

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.get(BASE_URL, { headers });
        return response.data as PostInfoDto[];
    }
);

export const fetchMyPosts = createAsyncThunk(
    'post/fetchMyPosts',
    async (_, { getState, dispatch }) => {

        await checkTokenValidity(dispatch);

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const uri = `${BASE_URL}user/${state.user.info.id}`;

        const response = await axios.get(uri, { headers });
        return response.data;
    }
);

export const fetchOtherUserPosts = createAsyncThunk(
    'post/fetchOtherUserPosts',
    async (userId: string, { getState, dispatch }) => {
        await checkTokenValidity(dispatch);

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const uri = `${BASE_URL}user/${userId}`;

        const response = await axios.get(uri, { headers });
        return response.data;
    }
);


export const createPost = createAsyncThunk<CreatePostDto, CreatePostDto>(
    'post/createPost',
    async (postObj, { getState, dispatch }) => {
        await checkTokenValidity(dispatch);

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const response = await axios.post(BASE_URL, postObj, { headers });
        return response.data;
    }
);

export const updatePost = createAsyncThunk<UpdatePostDto, { postId: string; postObj: UpdatePostDto }>(
    "post/updatePost",
    async ({ postId, postObj }, { getState, dispatch }) => {
        await checkTokenValidity(dispatch);

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const uri = `${BASE_URL}${postId}`;
        const response = await axios.patch(uri, postObj, { headers });
        return response.data;
    }
);


export const uploadPostImage = createAsyncThunk(
    "post/uploadPostImage",
    async ({ img, postId }: { img: File, postId: string }, { getState, dispatch }) => {
        await checkTokenValidity(dispatch);

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',

        };


        const formData = new FormData();
        formData.append('file', img);
        const url = `${CLOUD_STORAGE_BASE_URL}${postId}`;
        const response = await axios.post(url, formData, { headers });
        console.log(response.data);
        return response.data;
    }
);


export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (postId: string, { getState, dispatch }) => {
        await checkTokenValidity(dispatch);

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const url = `${BASE_URL}${postId}`;
        await axios.delete(url, { headers });
        return postId;
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

export const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchMyPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
        }).addCase(fetchMyPosts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchMyPosts.rejected, (state) => {
            state.isLoading = false;
        })


        builder.addCase(createPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
            state.isLoading = false;
        }).addCase(createPost.pending, (state) => {
            state.isLoading = true;
        }).addCase(createPost.rejected, (state) => {
            state.isLoading = false;
        })

        builder.addCase(uploadPostImage.fulfilled, (state) => {
            state.isLoading = false;
        }).addCase(uploadPostImage.pending, (state) => {
            state.isLoading = true;
        }).addCase(uploadPostImage.rejected, (state) => {
            state.isLoading = false;
        })



        builder.addCase(updatePost.fulfilled, (state, action: PayloadAction<UpdatePostDto>) => {
            const targetPost = state.posts.find(post => post.id === action.payload.id);
            if (targetPost && action.payload.imageUrl) {
                targetPost.imageUrl = action.payload.imageUrl;
            }
            state.isLoading = false;
        }).addCase(updatePost.pending, (state) => {
            state.isLoading = true;
        }).addCase(updatePost.rejected, (state) => {
            state.isLoading = false;
        })

        builder.addCase(deletePost.fulfilled, (state, action) => {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post.id !== postId);
            state.isLoading = false;
        }).addCase(deletePost.pending, (state) => {
            state.isLoading = true;
        }).addCase(deletePost.rejected, (state) => {
            state.isLoading = false;
        })


        builder.addCase(fetchAllPosts.fulfilled, (state) => {
            state.isLoading = false;
        }).addCase(fetchAllPosts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllPosts.rejected, (state) => {
            state.isLoading = true;
        })

    }
});

export const { } = postSlice.actions

export default postSlice.reducer

