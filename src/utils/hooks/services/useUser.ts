import { IUser } from 'src/types/user';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';

export const useUser = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/users/${id}`;

  const { data, error } = useSWR<IUser>([url, opts], fetcher);

  return {
    error,
    user: data,
    isLoading: !error && !data
  };
};
