import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './articleSlice';
import authReducer from './authSlice';
import commentReducer from './commentSlice';

export const store = configureStore({
    reducer: {
        articles: articleReducer,
        auth: authReducer,
        comments: commentReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch