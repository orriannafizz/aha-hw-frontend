import { useRouter } from 'next/router';
import LayoutWithHeader from '@/Layout/LayoutWithHeader';
import DashBoard from '@/components/DashBoard';
import VerifyEmail from '@/components/VerifyEmail';
import useUser from '@/hooks/useUser';

/**
 * Home page
 * @return {JSX.Element}
 */
export function Index() {
  // Next.js router
  const router = useRouter();

  // User state
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <LayoutWithHeader>Loading...</LayoutWithHeader>;
  }

  if (!user) {
    router.push('/login');
  }

  if (user?.isVerified === false) {
    return (
      <LayoutWithHeader>
        <VerifyEmail user={user} />
      </LayoutWithHeader>
    );
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
