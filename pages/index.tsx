import { User } from '@/@types';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LayoutWithHeader from '@/Layout/LayoutWithHeader';
import DashBoard from '@/components/DashBoard';
import VerifyEmail from '@/components/VerifyEmail';

/**
 * Home page
 * @return {JSX.Element}
 */
export function Index() {
  // Next.js router
  const router = useRouter();

  // isLoaded state (fetching user data from the server)
  const [isLoaded, setIsLoaded] = useState(false);

  // User state
  const [user, setUser] = useState<User | null>(null);

  // Fetch user data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/users/me');
        setUser(res.data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  if (!isLoaded) {
    return <LayoutWithHeader>Loading...</LayoutWithHeader>;
  }

  if (!user) {
    router.push('/login');
  }

  if (user?.isVerified === false) {
    return <LayoutWithHeader><VerifyEmail user={user} /></LayoutWithHeader>;
  }


  if (user) {
return (
      <LayoutWithHeader>
        <DashBoard user={user} />
      </LayoutWithHeader>
    );
}

  return <LayoutWithHeader>Nothing</LayoutWithHeader>;
}

export default Index;
