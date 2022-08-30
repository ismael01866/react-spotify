import { fetcher } from 'src/utils/fetch';
import { IUser } from 'src/types/user';
import useSWR from 'swr';

export const useMe = (opts = {}) => {
  const url = `/api/spotify/me`;
  const { data, error } = useSWR<IUser>([url, opts], fetcher);

  return {
    error,
    user: data,
    isLoading: !error && !data
  };
};
