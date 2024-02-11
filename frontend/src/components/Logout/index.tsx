import { useRouter } from 'next/router';
import { FC } from 'react';
import { cache as swrCache } from 'swr';

import { deleteUserSessions } from 'src/api/userSessions';
import { useAppDispatch } from 'src/store/hooks';
import { resetState as resetCurrentUser } from 'src/store/slices/currentUserSlice';
import { routeMap } from 'src/util/routeMap';

export const Logout: FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const logout = async (): Promise<void> => {
    swrCache.clear();
    dispatch(resetCurrentUser());
    const resp = await deleteUserSessions();
    if (!resp.isSuccess) return;

    await router.push(routeMap.login);
    return;
  };

  return (
    <>
      <button className="ea-profile-logout-btn" type="button" onClick={() => logout()}>
        <span className="ea-profile-logout-btn-link">ログアウト</span>
      </button>
    </>
  );
};
