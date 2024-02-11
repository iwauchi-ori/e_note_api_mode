import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

export type LoadingMap = {
  // currentUser
  fetchCurrentUser: boolean;
  patchCurrentUser: boolean;
  // users
  fetchUsers: boolean;
  postUsers: boolean;
  fetchUser: boolean;
  patchUsersId: boolean;
  deleteUsersId: boolean;
  fetchUsersRefine: boolean;
  // userSessions
  postUserSessions: boolean;
  deleteUserSessions: boolean;
};

const initialLoadingMap: Readonly<LoadingMap> = {
  // currentUser
  fetchCurrentUser: false,
  patchCurrentUser: false,
  // users
  fetchUsers: false,
  postUsers: false,
  fetchUser: false,
  patchUsersId: false,
  deleteUsersId: false,
  fetchUsersRefine: false,
  // userSessions
  postUserSessions: false,
  deleteUserSessions: false,
};

type LoadingsState = {
  isLoading: boolean;
  loadingMap: LoadingMap;
};

const judgeIsLoading = (loadingMap: LoadingMap): LoadingsState['isLoading'] =>
  Object.values(loadingMap).some((bool) => bool);

const initialState: Readonly<LoadingsState> = {
  isLoading: judgeIsLoading(initialLoadingMap),
  loadingMap: initialLoadingMap,
};

const getNextState = (state: LoadingsState, loadingMap: Partial<LoadingMap>): LoadingsState => {
  const nextLoadingMap: LoadingMap = { ...state.loadingMap, ...loadingMap };
  return { ...state, loadingMap: nextLoadingMap, isLoading: judgeIsLoading(nextLoadingMap) };
};

const slice = createSlice({
  name: 'loadings',
  initialState,
  reducers: {
    /**
     * @example
     * // fetchCalender と fetchSalesResults のローディング開始
     * dispatch(setLoadings({ fetchCalender: true, fetchSalesResults: true }));
     * // ローディング終了
     * dispatch(setLoadings({ fetchCalender: false, fetchSalesResults: false }));
     */
    setLoadings: (state, action: PayloadAction<Partial<LoadingMap>>): LoadingsState =>
      getNextState(state, action.payload),
    resetState: (state): LoadingsState => ({
      ...state,
      ...initialState,
    }),
  },
});

export const { setLoadings, resetState } = slice.actions;

export const loadingsReducer = slice.reducer;
