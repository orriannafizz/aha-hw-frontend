import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

/**
 * @param {unknown} error the error from backend
 * @return {void} toast the error message
 */
export function consoleToastError(error: unknown) {
  const axiosError = error as AxiosError;
  const data = axiosError.response?.data as { message: string };
  if (data) {
    toast.error(`Error: ${data.message}`);
  } else {
    toast.error('An unexpected error occurred.');
  }
}
