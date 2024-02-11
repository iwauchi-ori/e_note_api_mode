import type { FC } from 'react';
import { sideBarStyles } from 'src/styles/styledJsx/sideBarStyles';

export const Sidebar: FC = () => (
  <>
    <div className="sideBar">
      <p> サイドバー（仮）</p>
      <p>
        <a href="/">テスト</a>
      </p>
      <p>
        <a href="/">テスト</a>
      </p>
      <p>
        <a href="/">テスト</a>
      </p>
      <p>
        <a href="/">テスト</a>
      </p>
      <p>
        <a href="/">テスト</a>
      </p>
      <p>
        <a href="/">テスト</a>
      </p>
      <p>
        <a href="/">テスト</a>
      </p>
      <p>
        <a href="/">テスト</a>
      </p>
    </div>
    <style jsx>{sideBarStyles}</style>
  </>
);
