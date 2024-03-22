import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axiosInstance from '../utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { IResetPasswordFormData } from '@/@types';
import LayoutWithHeader from '@/Layout/LayoutWithHeader';
import useUser from '@/hooks/useUser';
import { consoleToastError } from '@/utils/toast.error';
import Cookies from 'js-cookie';

/**
 * a page to reset the password
 * @return {JSX.Element}
 */
export default function ResetPassword() {
  // use Next.js router
  const router = useRouter();

  // use state to store user data
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IResetPasswordFormData>({
    mode: 'all',
  });

  const [passwordValidations, setPasswordValidations] = useState({
    minChar: false,
    upperCase: false,
    lowerCase: false,
    digit: false,
    specialChar: false,
  });

  const passwordPattern = {
    minChar: /.{8,}/,
    upperCase: /[A-Z]/,
    lowerCase: /[a-z]/,
    digit: /[0-9]/,
    specialChar: /[^A-Za-z0-9]/,
  };

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

  const onSubmit = async (data: IResetPasswordFormData) => {
    try {
      await axiosInstance.patch('/users/reset-password', {
        oldPassword: data.oldPassword,
        newPassword: data.password,
      });

      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      toast.success('Password changed successfully. Please log in again.');
      router.push('/login');
    } catch (error) {
      consoleToastError(error);
    }
  };

  return (
    <LayoutWithHeader>
      <ToastContainer />
      <div className='flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-3xl font-extrabold text-center'>
            Change Password
          </h2>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
            {user?.hasPassword && (
              <div>
                <label
                  htmlFor='oldPassword'
                  className='block text-sm font-medium text-gray-700'>
                  Old Password
                </label>
                <input
                  {...register('oldPassword')}
                  id='oldPassword'
                  name='oldPassword'
                  type='password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
                />
                {errors.oldPassword && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'>
                New Password
              </label>
              <input
                {...register('password', {
                  required: 'Password is required',
                  validate: (value) =>
                    Object.values(passwordValidations).every(Boolean),
                })}
                id='password'
                name='password'
                type='password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
              />
              <div className='mt-2'>
                <p>Password must have:</p>
                <ul>
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
              {errors.password && (
                <p className='mt-2 text-sm text-red-600'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'>
                Confirm New Password
              </label>
              <input
                {...register('confirmPassword', {
                  required: 'Confirming your new password is required',
                  validate: (value) =>
                    value === password || 'The passwords do not match',
                })}
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
              />
              {errors.confirmPassword && (
                <p className='mt-2 text-sm text-red-600'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div>
              <button
                type='submit'
                disabled={!isValid}
                className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-2'>
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutWithHeader>
  );
}
