import type { FC } from 'react';
import Link from 'next/link';
import { MainButton } from './Buttons/MainButton';
import { Timeline } from './Timelines';

export const Dashboard: FC = () => {
  return (
    <>
      <div className="ea-main-contents-wrap">
        <div className="ea-main-contents">
          <h1>ダッシュボード（仮）</h1>
        </div>
        <MainButton />
        <Timeline />
      </div>
      <style jsx>{``}</style>
    </>
  );
};
