import axiosInstance from '../utils/axiosInstance';
import { useEffect, useState } from 'react';
import { User, UserStatics } from '@/@types';
import { getTimeStamp } from '@/utils/time';

const DashBoard = ({ user }: { user: User }) => {
  const [userStatics, setUserStatics] = useState<UserStatics | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('users/statics');
        setUserStatics(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className='min-h-full'>
        <header className='bg-white shadow-sm'>
          <div className='px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <h1 className='text-lg font-semibold leading-6 text-gray-900'>
              Hi! {user.username}
            </h1>
          </div>
        </header>
        <main>
          <div className='py-6 mx-auto font-semibold max-w-7xl sm:px-6 lg:px-8'>
            <h2 className='text-lg font-semibold leading-6 text-gray-900'>
              Your Status:
            </h2>
            <ul>
              <li>
                Sign up timestamp: {getTimeStamp(user.createdAt)}(
                {user.createdAt})
              </li>
              <li>Login Times: {user.loginTimes}</li>
              <li>
                Last User Session timestamp: {getTimeStamp(user.updatedAt)}(
                {user.updatedAt})
              </li>
            </ul>
          </div>
          <div className='py-6 mx-auto font-semibold max-w-7xl sm:px-6 lg:px-8'>
            <h2 className='text-lg font-semibold leading-6 text-gray-900'>
              User Statics:
            </h2>
            <ul>
              <li>Total user count: {userStatics?.usersCount}</li>
              <li>Today login user count: {userStatics?.todayLoginTimes}</li>
              <li>
                Last 7 days average login user count:
                {userStatics?.last7DaysAvgLoginTimes}
              </li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashBoard;
