import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { IUser } from 'types/user';
import { fetcher } from 'utils/fetch';

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
