import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import postReducer from './postSlice'
import authReducer from './authSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        auth: authReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
// export type RootState  = {
//     post: PostInitialState;
//     user: User;
// };
export type AppDispatch = typeof store.dispatch;