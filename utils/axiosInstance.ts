import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

axiosInstance.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;
  // check if the error is 401 and if the original request has not been retried
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    try {
      const res = await axiosInstance.post('/auth/refresh-token');
      const data = res.data.data;
      const accessToken = data.accessToken;
      Cookies.set('accessToken', accessToken);

      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;

      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});
