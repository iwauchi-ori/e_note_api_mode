import type { FC } from "react";
import { loadingStyles } from "src/styles/styledJsx/loadingStyles";

interface IProps {
  isLoading: boolean;
}

export const Loader: FC<IProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <>
      <div className="tr-loading">
        <p className="tr-loading-text">
          ロード中
        </p>
      </div>
      <style jsx>{loadingStyles}</style>
    </>
  );
};