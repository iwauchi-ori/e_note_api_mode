import { useState, useEffect } from 'react';
import { ApiError, handleApiError, handleApiResponse, httpClient, IHandleApiResponseRet } from '../axiosHandlers';
import { POST_TICKET_PATH } from './path';

interface TretterTicketsReq {
  title: string;
}

type Resp = '';

export const postTretterTickets = async (req: TretterTicketsReq) => {
  try {
    const response = await httpClient.post(POST_TICKET_PATH, req);
    return handleApiResponse<Resp>({ response, expectedStatus: 200 });
  } catch (error: unknown) {
    return handleApiError({ error, methodName: postTretterTickets.name });
  }
};
