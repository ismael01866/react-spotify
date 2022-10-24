import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { IUser } from 'types/user';
import { fetcher } from 'utils/fetch';

export const useUser = (id: string | string[] | undefined, opts = {}) => {
  const { headers, url } = useSpotifyApi(`/users/${id}`);

  const { data, error } = useSWR<IUser>(
    [url, { ...headers, ...opts }],
    fetcher
  );

  return {
    error,
    user: data,
    isLoading: !error && !data
  };
};
