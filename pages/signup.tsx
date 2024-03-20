import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/utils/axiosInstance';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ISignUpFormData } from '@/@types';
import { consoleToastError } from '@/utils/toast.error';

const passwordPattern = {
  minChar: /.{8,}/,
  upperCase: /[A-Z]/,
  lowerCase: /[a-z]/,
  digit: /[0-9]/,
  specialChar: /[^A-Za-z0-9]/,
};

/**
 * A page for sign up
 * @return {JSX.Element}
 */
export default function SignUp() {
  // Next.js router
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ISignUpFormData>({
    mode: 'all',
  });

  // Password validation
  const [passwordValidations, setPasswordValidations] = useState({
    minChar: false,
    upperCase: false,
    lowerCase: false,
    digit: false,
    specialChar: false,
  });

  // Watch password and confirmPassword
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    setPasswordValidations({
      minChar: passwordPattern.minChar.test(password),
      upperCase: passwordPattern.upperCase.test(password),
      lowerCase: passwordPattern.lowerCase.test(password),
      digit: passwordPattern.digit.test(password),
      specialChar: passwordPattern.specialChar.test(password),
    });
  }, [password, confirmPassword]);

  /**
   * submit form to sign up
   * @param {ISignUpFormData} data data from the form
   * @return {Promise<void>}
   */
  const onSubmit = async (data: ISignUpFormData) => {
    try {
      await axiosInstance.post('/users', {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      const loginRes = await axiosInstance.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      const accessToken = loginRes.data.accessToken;
      Cookies.set('accessToken', accessToken);
      toast.success('Sign up successfully, redirecting to Landing Page...');
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
            Sign up
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
                htmlFor='username'
                className='block text-sm font-medium leading-6 text-gray-900'>
                username
              </label>
              <div className='mt-2'>
                <input
                  {...register('username', {
                    required: true,
                  })}
                  id='username'
                  name='username'
                  type='text'
                  autoComplete='username'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
                  required
                />
                {errors.username && (
                  <p className='text-red-500'>username is required</p>
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
                  {...register('password', {
                    required: 'Password is required',
                    validate: (value) =>
                      Object.values(passwordValidations).every(Boolean),
                  })}
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='password'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
                  required
                />
                <div>
                  <p>Password must have:</p>
                  <ul className='text-sm'>
                    <li>
                      At least 8 characters{' '}
                      {passwordValidations.minChar ? '✅' : '❌'}
                    </li>
                    <li>
                      An uppercase letter{' '}
                      {passwordValidations.upperCase ? '✅' : '❌'}
                    </li>
                    <li>
                      A lowercase letter{' '}
                      {passwordValidations.lowerCase ? '✅' : '❌'}
                    </li>
                    <li>A digit {passwordValidations.digit ? '✅' : '❌'}</li>
                    <li>
                      A special character{' '}
                      {passwordValidations.specialChar ? '✅' : '❌'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Confirm Password
              </label>
              <div className='mt-2'>
                <input
                  {...register('confirmPassword', {
                    required: 'You must confirm your password',
                    validate: (value) =>
                      value === watch('password') ||
                      'The passwords do not match',
                  })}
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  autoComplete='new-password'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
                  required
                />
                {errors.confirmPassword && (
                  <p className='text-red-500'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type='submit'
                disabled={!isValid}
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                Sign up
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
                Sign up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
