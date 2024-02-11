import type { FC, ReactNode } from 'react';

import { Loader } from 'src/components/common/Loader';

import { useAppSelector } from 'src/store/hooks';

type IProps = {
  children: ReactNode;
};

export const LayoutPublic: FC<IProps> = ({ children }) => {

  const { isLoading } = useAppSelector((s) => s.loadings);

  return  (
    <>
      {children}
      <Loader isLoading={isLoading} />
    </>
  );
};
