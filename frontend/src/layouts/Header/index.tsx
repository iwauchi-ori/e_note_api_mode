import type { FC } from 'react';
import Link from 'next/link';
import { headerStyles } from 'src/styles/styledJsx/headerStyles';
import { Logout } from 'src/components/Logout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

interface IProps {
  pageTitle: string;
}

export const Header: FC<IProps> = ({ pageTitle }) => {
  const { name } = useAppSelector((s) => s.currentUser);

  return (
    <>
      <header className="ea-header">
        <div className="ea-logo-box">
          <h1 className="ea-logo">tretter</h1>
        </div>

        <div className="ea-page-ttl-wrap">
          <div className="ea-page-ttl-box">
            <h2 className="ea-page-ttl">{pageTitle}</h2>
          </div>
        </div>

        <div className="header-buttons">
          <Link href="/" legacyBehavior>
            <a className="tr-header-link">
              <span>Home</span>
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="tr-header-link">
              <span>プロフィール</span>
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="tr-header-link">
              <span>設定</span>
            </a>
          </Link>
          <Logout />
        </div>
        <div className="tr-name">
          <p>
            ようこそ、
            {name}
            さん
          </p>
        </div>
      </header>
      <style jsx>{headerStyles}</style>
      <style jsx>{``}</style>
    </>
  );
};
