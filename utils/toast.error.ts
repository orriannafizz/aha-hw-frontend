import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function consoleToastError(error: unknown) {
  const axiosError = error as AxiosError;
  const data = axiosError.response?.data as { message: string };
  if (data) {
    toast.error(`Error: ${data.message}`);
  } else {
    toast.error('An unexpected error occurred.');
  }
}
