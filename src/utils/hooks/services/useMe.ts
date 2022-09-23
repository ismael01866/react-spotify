import { IUser } from 'src/types/user';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';
import { useSpotifyApi } from '../useSpotifyApi';

export const useMe = (opts = {}) => {
  const { headers, url } = useSpotifyApi(`/me`);

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
