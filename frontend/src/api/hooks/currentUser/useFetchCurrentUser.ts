import type { UserResp } from "src/api/schemas/user";

import { useEffect, useState } from "react";
import { useFetcher } from "src/api/hooks/useFetcher";
import { useAppDispatch } from "src/store/hooks";
import {
  setAttributes as setCurrentUserAttrs,
  resetState as resetCurrentUser,
} from 'src/store/slices/currentUserSlice';
import { userRespSchema } from "src/api/schemas/user";
import { useLoadings } from 'src/hooks/useLoadings';

export const useFetchCurrentUser = () => {
  const { startLoadings, stopLoadings } = useLoadings({ triggers: ['fetchCurrentUser'] });
  // , inProgress, skipped
  const { data, error, mutate } = useFetcher<undefined,UserResp>({
    req: { path: "/current_user" },
    resp: {
      expectedStatus: 200,
      bodyValidator: (respBody) => userRespSchema.parse(respBody),
    },
    callbacks: {
      beforeReq: () => {
        startLoadings();
      },
      afterReq: () => {
        stopLoadings();
      },
    },
    methodName: useFetchCurrentUser.name,
  });

  const [currentUser, setCurrentUser] = useState<UserResp>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (inProgress || skipped) return;

    if (data?.isSuccess && !error) {
      // 取得に成功したらcurrentUserをstoreにセット
      dispatch(setCurrentUserAttrs(data.responseData.data.attributes));
      // dispatch(setLoginLabels(DEFAULT_LOGIN_LABELS));
      setCurrentUser(data.responseData);
    } else {
      // 取得に失敗したら、currentUserをクリアして、再認証用のログインフォーム表示準備
      dispatch(resetCurrentUser());
      // dispatch(setLoginLabels(LOGIN_LABELS_RE_LOGIN));
      setCurrentUser(undefined);
    }
  }, [data, error, dispatch]);
  // inProgress, skipped,

  return { currentUser, error, mutate };
};