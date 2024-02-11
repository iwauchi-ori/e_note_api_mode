import { httpClient, handleApiResponse, handleApiError } from './axiosHandlers';

import type { IHandleApiResponseRet, ApiError } from './axiosHandlers';

const PATH = '/user_sessions';

type PostUserSessionsReq = {
  email: string;
  password: string;
};
type PostUserSessionsResp = '';
type PostUserSessionsRet = IHandleApiResponseRet<PostUserSessionsResp> | ApiError;
export const postUserSessions = async (params: PostUserSessionsReq): Promise<PostUserSessionsRet> => {
  try {
    const response = await httpClient.post<PostUserSessionsResp>(PATH, params);
    return handleApiResponse<PostUserSessionsResp>({
      response,
      expectedStatus: 204,
    });
  } catch (error: unknown) {
    return handleApiError({ error, methodName: postUserSessions.name });
  }
};

type DeleteUserSessionsResp = '';
type DeleteUserSessionsRet = IHandleApiResponseRet<DeleteUserSessionsResp> | ApiError;
export const deleteUserSessions = async (): Promise<DeleteUserSessionsRet> => {
  try {
    const response = await httpClient.delete<DeleteUserSessionsResp>(PATH);
    return handleApiResponse<DeleteUserSessionsResp>({
      response,
      expectedStatus: 204,
    });
  } catch (error: unknown) {
    return handleApiError({ error, methodName: deleteUserSessions.name });
  }
};
