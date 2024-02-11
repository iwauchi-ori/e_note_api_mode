import type { FC, ReactNode } from 'react';

import { useEffect } from 'react';
// import { useAppDispatch } from 'src/store/hooks';
// import { setTranslateX as setSnackbarTransformX } from 'src/store/slices/snackbarSlice';
// import { footerStyles } from 'src/styles/styledJsx/footerStyles';
// import { loginformStyle } from 'src/styles/styledJsx/loginformStyle';

type IProps = {
  children: ReactNode;
};

export const LoginWrapper: FC<IProps> = ({ children }) => {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   // snackbar の transformX のスタイルを設定するための副作用
  //   // ログインフォーム系画面は 0
  //   dispatch(setSnackbarTransformX(0));
  // }, [dispatch]);

  return (
    <>
      <div className="tr-login open">
        <div className="tr-login-content">{children}</div>
      </div>

      <style jsx>{`
        .tr-login {
          z-index: 1000;
        }
      `}</style>
    </>
  );
};
