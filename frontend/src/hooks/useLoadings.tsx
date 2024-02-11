import type { LoadingMap } from 'src/store/slices/loadingsSlice';

import { useCallback } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { setLoadings } from 'src/store/slices/loadingsSlice';

interface IProps {
  triggers: (keyof LoadingMap)[];
}

export const useLoadings = ({ triggers }: IProps) => {
  const dispatch = useAppDispatch();

  const startLoadings = useCallback(() => {
    const m = triggers.reduce<Partial<LoadingMap>>((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});

    dispatch(setLoadings(m));
  }, [triggers, dispatch]);

  const stopLoadings = useCallback(() => {
    const m = triggers.reduce<Partial<LoadingMap>>((acc, cur) => {
      acc[cur] = false;
      return acc;
    }, {});

    dispatch(setLoadings(m));
  }, [triggers, dispatch]);

  return { startLoadings, stopLoadings };
};
