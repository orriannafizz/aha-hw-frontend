import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/router';
import { ILoginFormData } from '@/@types';
import { consoleToastError } from '@/utils/toast.error';
import Link from 'next/link';

const Login = () => {
  // Next.js router
  const router = useRouter();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  // Submit form to login
  const onSubmit = async (data: ILoginFormData) => {
    try {
      await axiosInstance.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
      router.push('/');
    } catch (error) {
      consoleToastError(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900'>
            Log in your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Email address
              </label>
              <div className='mt-2'>
                <input
                  {...register('email', {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
                  required
                />
                {errors.email && (
                  <p className='text-red-500'>Email is required</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Password
              </label>
              <div className='mt-2'>
                <input
                  {...register('password', { required: true })}
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='password'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
                  required
                />
                {errors.password && (
                  <p className='text-red-500'>Password is required</p>
                )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                Log in
              </button>
            </div>
            <div>
              <button
                type='button'
                onClick={() =>
                  (window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`)
                }
                className='flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <Image
                  src='/google.svg'
                  alt='Google'
                  width={20}
                  height={20}
                  className='mr-2'
                />
                Log in with Google
              </button>
            </div>
          </form>
          <p className='mt-10 text-sm text-center text-gray-500'>
            Not a member?{' '}
            <Link
              href='/signup'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
