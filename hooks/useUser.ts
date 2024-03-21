import { User } from '@/@types';
import axiosInstance from '@/utils/axiosInstance';
import { useState, useCallback, useEffect } from 'react';

/**
 * Handle get user data.
 * @return {{ User, function }} An object containing the user data and a function to fetch the user data.
 */
export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleGetUser = useCallback(async () => {
    try {
      setIsLoaded(false);
      const res = await axiosInstance.get('/users/me');
      setUser(res.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    handleGetUser();
  }, []);

  return { user, handleGetUser, isLoaded };
}
