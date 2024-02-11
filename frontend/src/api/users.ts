import type { IHandleApiResponseRet, ApiError } from './axiosHandlers';

import { httpClient, handleApiError, handleApiResponse } from './axiosHandlers';

const BASE_PATH = '/users';

// ========== POST /api/v1/users ==========
type PostUsersReq = {
  name: string;
  email: string;
  password: string;
};
type PostUsersResp = '';
type PostUsersRet = IHandleApiResponseRet<PostUsersResp> | ApiError;

export const postUsers = async (params: PostUsersReq): Promise<PostUsersRet> => {
  try {
    const response = await httpClient.post<PostUsersResp>(BASE_PATH, params);
    return handleApiResponse<PostUsersResp>({ response, expectedStatus: 204 });
  } catch (error: unknown) {
    return handleApiError({ error, methodName: postUsers.name });
  }
};
