import { configureStore } from '@reduxjs/toolkit';
import { currentUserReducer } from './slices/currentUserSlice';
import { loadingsReducer } from './slices/loadingsSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    loadings: loadingsReducer,
  },
  devTools: process.env.NEED_DEBUG === 'true',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
