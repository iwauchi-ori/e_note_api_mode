import type { IHandleApiResponseRet, ApiError } from 'src/api/axiosHandlers';
import type { ReqQueryBase } from './types';

import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { getRequest } from './getRequest';
import { postRequest } from './postRequest';

type ReqProps<T extends ReqQueryBase | undefined> = {
  /** If null, skip calling api. */
  path: string | null;
  query?: T;
};

type RespProps<T> = {
  expectedStatus: number;
  bodyValidator?: (respBody: T) => unknown;
};

interface IUseFetcherRet<RespBody> {
  data: IHandleApiResponseRet<RespBody> | undefined;
  error: ApiError | undefined;
  mutate: (dataToMutate?: RespBody) => Promise<void>;
  // If both data and error are undefined, return true.
  // inProgress: boolean;
  // // If api request is not executed, return true.
  // skipped: boolean;
}

interface ICallbacks {
  /** beforeReq is executed before calling api every time. */
  beforeReq?: () => void;
  /** afterReq is executed after calling api every time. */
  afterReq?: () => void;
  /** onReqSuccess is executed after api request succeeded. */
  onReqSuccess?: () => void;
  /** onReqFailed is executed after api request failed. */
  onReqFailed?: () => void;
}

export interface IUseFetcherProps<ReqQuery extends ReqQueryBase, RespBody> {
  /** If true, skip calling api at the initialization. Default value is false. */
  skip?: boolean;
  req: ReqProps<ReqQuery>;
  resp: RespProps<RespBody>;
  callbacks?: ICallbacks;
  methodName?: string;
  httpMethod?: 'get' | 'post';
}

export const useFetcher = <ReqQuery extends ReqQueryBase, RespBody>({
  skip = false,
  req,
  resp,
  callbacks,
  methodName,
  httpMethod = 'get',
}: IUseFetcherProps<ReqQuery, RespBody>): IUseFetcherRet<RespBody> => {
  const fetcher = useCallback(
    async (path: string, query?: ReqQuery): Promise<IHandleApiResponseRet<RespBody>> => {
      if (callbacks?.beforeReq) callbacks.beforeReq();

      const r =
        httpMethod === 'post'
          ? await postRequest<ReqQuery, RespBody>({
              req: { path, query },
              resp: {
                expectedStatus: resp.expectedStatus,
                bodyValidator: resp.bodyValidator,
              },
              methodName,
            })
          : await getRequest<ReqQuery, RespBody>({
              req: { path, query },
              resp: {
                expectedStatus: resp.expectedStatus,
                bodyValidator: resp.bodyValidator,
              },
              methodName,
            });

      if (callbacks?.afterReq) callbacks.afterReq();

      if (!r.isSuccess) {
        if (callbacks?.onReqFailed) callbacks.onReqFailed();
        throw r;
      }

      if (callbacks?.onReqSuccess) callbacks.onReqSuccess();
      return r;
    },
    [resp, callbacks, methodName, httpMethod],
  );

  const [doesRefetch, setDoesRefetch] = useState(false);

  const swrKey: Parameters<typeof fetcher> | null = useMemo(() => {
    if (doesRefetch) return !req.path ? null : [req.path, req.query];

    return skip || !req.path ? null : [req.path, req.query];
  }, [doesRefetch, skip, req.path, req.query]);

  const {
    data,
    error,
    mutate: swrMtt,
  } = useSWR<IHandleApiResponseRet<RespBody>, ApiError>(swrKey, fetcher, {
    onErrorRetry: (error, _key, _config, _revalidate, { retryCount }) => {
      if (error.status === 401) return;

      if (retryCount > 5) return;
    },
  });

  const mutate = useCallback(
    async (dataToMutate?: RespBody) => {
      setDoesRefetch(true);
      await swrMtt(dataToMutate ? { isSuccess: true, responseData: dataToMutate } : undefined);
      setDoesRefetch(false);
    },
    [swrMtt],
  );

  return {
    data,
    error,
    mutate,
    // inProgress: !data && !error,
    // skipped: swrKey === null || swrKey.length < 1,
  };
};
