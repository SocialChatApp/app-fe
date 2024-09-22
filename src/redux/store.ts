import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import postReducer from './postSlice'
import authReducer from './authSlice'
import commentReducer from './commentSlice'
import commentReplyReducer from './commentReplies';

export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        auth: authReducer,
        comment: commentReducer,
        commentReply: commentReplyReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
// export type RootState  = {
//     post: PostInitialState;
//     user: User;
// };
export type AppDispatch = typeof store.dispatch;