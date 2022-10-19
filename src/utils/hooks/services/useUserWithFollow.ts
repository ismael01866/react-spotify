import { IUser } from 'src/types/user';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';

export const useUserWithFollow = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/custom/users-with-follow/${id}`;

  const { data, error } = useSWR<IUser>(
    () => (id ? [url, opts] : null),
    fetcher
  );

  return {
    error,
    user: data,
    isLoading: !error && !data
  };
};
