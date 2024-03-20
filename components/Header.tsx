import { Disclosure } from '@headlessui/react';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/router';
import { classNames } from '@/utils/tailwind';

const navigation = [
  { name: 'Dashboard', href: '/', current: false },
  { name: 'Reset Password', href: '/reset-password', current: false },
];

const Header = () => {
  // Next.js router
  const router = useRouter();

  // Check if the current page is the same as the href
  const isCurrentPage = (href: string) => router.pathname === href;

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {() => (
        <>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center'>
                <div className='hidden md:block'>
                  <div className='flex items-baseline ml-10 space-x-4'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(item.href);
                        }}
                        className={classNames(
                          isCurrentPage(item.href)
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={
                          isCurrentPage(item.href) ? 'page' : undefined
                        }>
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='flex items-center ml-4 md:ml-6'>
                  <button
                    type='button'
                    className='p-1 text-gray-400 bg-gray-800 hover:text-white focus:outline-none'
                    onClick={async () => {
                      await axiosInstance.post('auth/logout');
                      router.reload();
                    }}>
                    LOGOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
