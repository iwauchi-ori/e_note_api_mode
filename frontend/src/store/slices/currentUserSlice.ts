import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { User } from 'src/api/schemas/user';

type CurrentUserState = Partial<User>;

const initialState: Readonly<CurrentUserState> = {
  id: undefined,
  name: undefined,
  email: undefined,
};

const slice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setAttributes: (state, action: PayloadAction<User>): CurrentUserState => ({
      ...state,
      ...action.payload,
    }),
    resetState: (state): CurrentUserState => ({
      ...state,
      ...initialState,
    }),
  },
});

export const { setAttributes, resetState } = slice.actions;

export const currentUserReducer = slice.reducer;
