import { AxiosError } from 'axios';

interface IHandleApiErrorArgs {
  error: unknown;
  methodName: string;
  needErrorLogs?: boolean;
}

/**
 * @description API側で例外が発生した場合に、APIが返すレスポンスボディ
 * @todo 仕様検討が必要
 */
interface IApiErrorRespBody {
  isApiError: true;
  message: string;
}

export class ApiError extends Error {
  isSuccess: false = false;

  constructor(
    message: string,
    public status: number | undefined,
    public data: IApiErrorRespBody | undefined,
  ) {
    super(message);
  }
}

const isError = (err: unknown): err is Error => err instanceof Error;

const isAxiosError = (err: unknown): err is AxiosError => isError(err) && !!(err as AxiosError)?.isAxiosError;

const isApiError = (err: unknown): err is AxiosError<IApiErrorRespBody> =>
  isAxiosError(err) && !!(err as AxiosError<IApiErrorRespBody>)?.response?.data?.isApiError;

export const handleApiError = ({
  error,
  methodName,
  needErrorLogs = process.env.NEED_DEBUG === 'true',
}: IHandleApiErrorArgs): ApiError => {
  const message = isError(error) ? error.message : '';
  if (needErrorLogs) console.error(`Fail at ${methodName}\n${message}`);

  const status = isAxiosError(error) ? error.response?.status : undefined;
  const data = isApiError(error) ? error.response?.data : undefined;
  return new ApiError(message, status, data);
};
