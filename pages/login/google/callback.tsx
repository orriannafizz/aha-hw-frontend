import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const { accessToken, refreshToken } = router.query;
    const isRedirected =
      accessToken === undefined ||
      refreshToken === undefined ||
      typeof accessToken !== 'string' ||
      typeof refreshToken !== 'string';
    if (isRedirected) {
      router.push('/login');
    } else {
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
    }
  }, [router.query]);

  return null;
};

export default Callback;
