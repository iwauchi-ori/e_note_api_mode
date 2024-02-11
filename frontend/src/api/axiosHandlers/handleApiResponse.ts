import { AxiosResponse } from 'axios';

interface IHandleApiResponseArgs<T> {
  response: AxiosResponse<T>;
  expectedStatus: AxiosResponse<T>['status'];
  dataValidator?: (data: AxiosResponse<T>['data']) => unknown;
}

export interface IHandleApiResponseRet<T> {
  isSuccess: true;
  responseData: T;
}

export const handleApiResponse = <T>({
  response,
  expectedStatus,
  dataValidator,
}: IHandleApiResponseArgs<T>): IHandleApiResponseRet<T> => {
  if (process.env.NEED_DEBUG === 'true' && dataValidator) {
    const result = dataValidator(response.data);
    console.debug(
      `"${response.config.method?.toUpperCase() || ''} ${
        response.config.url || ''
      }" validation result of response data is\n`,
      result,
    );
  }

  const isSuccess = response.status === expectedStatus;
  if (!isSuccess) throw new Error('Unexpected status.');

  return { isSuccess, responseData: response.data };
};
