import useSWR from 'swr';

import { IUser } from 'types/user';
import { fetcher } from 'utils/fetch';

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
