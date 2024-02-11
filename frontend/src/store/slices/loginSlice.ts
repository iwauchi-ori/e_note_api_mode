import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

export const DEFAULT_LOGIN_LABELS = {
  pageTitle: 'ログイン',
  formTitle: 'ログイン',
  buttonLabel: 'ログインする',
} as const;

export const LOGIN_LABELS_ON_ERROR = {
  ...DEFAULT_LOGIN_LABELS,
  pageTitle: 'ログインエラー',
} as const;

export const LOGIN_LABELS_AFTER_LOGOUT = {
  ...DEFAULT_LOGIN_LABELS,
  pageTitle: 'ログアウト',
  formTitle: 'ログアウトしました',
  buttonLabel: '再度ログインする',
} as const;

export const LOGIN_LABELS_RE_LOGIN = {
  ...DEFAULT_LOGIN_LABELS,
  pageTitle: '再ログイン',
  formTitle: 'ログインの有効期限が切れました',
  buttonLabel: '再度ログインする',
} as const;

type LoginLabels =
  | typeof DEFAULT_LOGIN_LABELS
  | typeof LOGIN_LABELS_ON_ERROR
  | typeof LOGIN_LABELS_AFTER_LOGOUT
  | typeof LOGIN_LABELS_RE_LOGIN;

type LoginState = {
  labels: LoginLabels;
};

const initialState: Readonly<LoginState> = {
  labels: DEFAULT_LOGIN_LABELS,
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLabels: (state, action: PayloadAction<LoginState['labels']>) => ({
      ...state,
      labels: {
        ...state.labels,
        ...action.payload,
      },
    }),
    resetState: (state) => ({
      ...state,
      ...initialState,
    }),
  },
});

export const { setLabels, resetState } = slice.actions;

export const loginReducer = slice.reducer;
