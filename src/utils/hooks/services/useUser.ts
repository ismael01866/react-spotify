import { IUser } from 'src/types/user';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';
import { useSpotifyApi } from '../api';

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
