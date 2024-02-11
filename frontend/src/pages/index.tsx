import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { routeMap } from '../util/routeMap';

const TopPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.replace(routeMap.dashboard);
  }, [router]);

  return null;
};

export default TopPage;
