import type { ReqQueryBase } from './types';

import { httpClient, handleApiError, handleApiResponse } from 'src/api/axiosHandlers';

export const postRequest = async <ReqQuery extends ReqQueryBase, RespBody>({
  req,
  resp,
  methodName,
}: {
  req: { path: string; query?: ReqQuery };
  resp: {
    expectedStatus: number;
    bodyValidator?: (respBody: RespBody) => unknown;
  };
  methodName?: string;
}) => {
  try {
    const response = await httpClient.post<RespBody>(req.path, req.query);

    return handleApiResponse({
      response,
      expectedStatus: resp.expectedStatus,
      dataValidator: resp.bodyValidator,
    });
  } catch (error: unknown) {
    return handleApiError({
      error,
      methodName: methodName || `function to call POST ${req.path}`,
    });
  }
};
