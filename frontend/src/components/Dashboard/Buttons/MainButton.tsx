import Link from 'next/link';
import { FC } from 'react';
export const MainButton = () => {
  return (
    <>
      <div className="main-button">
        <Link href="/my_todo">
          <span>つぶやく</span>
        </Link>
        <Link href="/my_todo">
          <span>チケット作成</span>
        </Link>
        <Link href="/my_todo">
          <span>みんなのつぶやきを見る</span>
        </Link>
        <Link href="/sign_up">
          <span>サインイン</span>
        </Link>
      </div>
      <style jsx>{`
        .main-button {
          width: 100%;
        }
        span {
          margin-right: 10px;
        }
      `}</style>
    </>
  );
};
