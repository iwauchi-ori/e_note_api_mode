import type { FC, ReactNode } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFetchCurrentUser } from 'src/api/hooks/currentUser/useFetchCurrentUser';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setAttributes } from 'src/store/slices/currentUserSlice';
import { Login } from 'src/components/Login';
import { SignUp } from 'src/components/SignUp';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';

interface IProps {
  pageTitle: string;
  children: ReactNode;
}

export const Layout: FC<IProps> = ({ children, pageTitle }) => {
  const dispatch = useAppDispatch();
  const { data, mutate, error } = useFetchCurrentUser();

  useEffect(() => {
    const attrs = data?.responseData?.data?.attributes;
    if (!attrs) return;

    dispatch(setAttributes(attrs));
  }, [dispatch, data?.responseData?.data?.attributes]);

  const onLoginSuccess = async () => {
    await mutate();
  };
  // currentUser が store に存在しなければログインフォームを表示
  if (error) return (
  <>
    <Login onLoginSuccess={onLoginSuccess} />
    <SignUp  onLoginSuccess={onLoginSuccess}/>
  </>
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Header pageTitle={pageTitle} />
      <div className="sc-wrap">
        <Sidebar />
        {children}
      </div>

      <Footer />
      <style jsx>{`
        .sc-wrap {
          display: flex;
          border: solid 1px gray;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};
