import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostDto } from "../dto/CreatePostDto";
import axios from 'axios';
import { RootState } from "./store";
import { UpdatePostDto } from "../dto/UpdatePostDto";



export interface InitialState {
    posts: CreatePostDto[];
    isLoading: boolean;
}

const initialState: InitialState = {
    posts: [],
    isLoading: false
};

export const fetchAllPosts = createAsyncThunk(
    'post/fetchAllPosts',
    async (_, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };
        const uri = `http://localhost:3000/post/user/${state.user.info.id}`;

        const response = await axios.get(uri, { headers });
        return response.data;
    }
);

export const createPost = createAsyncThunk<CreatePostDto, CreatePostDto>(
    'post/createPost',
    async (postObj, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const uri = `http://localhost:3000/post/`;
        const response = await axios.post(uri, postObj, { headers });
        return response.data;
    }
);

export const updatePost = createAsyncThunk<UpdatePostDto, { postId: string; postObj: UpdatePostDto }>(
    "post/updatePost",
    async ({ postId, postObj }, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const uri = `http://localhost:3000/post/${postId}`;
        const response = await axios.patch(uri, postObj, { headers });
        return response.data;
    }
);


export const uploadPostImage = createAsyncThunk(
    "post/uploadPostImage",
    async ({ img, postId }: { img: File, postId: string }, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',

        };


        const formData = new FormData();
        formData.append('file', img);
        const url = `http://localhost:3000/cloud-storage/posts/${postId}`;
        const response = await axios.post(url, formData, { headers });
        console.log(response.data);
        return response.data;
    }
);


export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (postId: string, { getState }) => {

        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const url = `http://localhost:3000/post/${postId}`;
        await axios.delete(url, { headers });
        return postId;
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
            state.isLoading = false;
        }).addCase(fetchAllPosts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllPosts.rejected, (state) => {
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

    }
});

export const { } = postSlice.actions

export default postSlice.reducer

