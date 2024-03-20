import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '@/utils/axiosInstance';
import { User } from '@/@types';
import { consoleToastError } from '@/utils/toast.error';

/**
 * component for verifying email
 * @param {User} { user }
 * @return {JSX.Element}
 */
function VerifyEmail ({ user }: { user: User }) {
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Verify your email
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address: {user.email}
            </label>
          </div>

          <div>
            <button
              onClick={() => {
                axiosInstance
                  .post('/users/send-verify-email')
                  .then((res) => {
                    toast.success('Verification email sent');
                  })
                  .catch((error) => {
                    consoleToastError(error);
                  });
              }}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
            >
              Send verification email
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
