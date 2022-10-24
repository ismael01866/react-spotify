import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { IArtist } from 'types/artist';
import { fetcher } from 'utils/fetch';

export const useArtist = (id: string | string[] | undefined, opts = {}) => {
  const { headers, url } = useSpotifyApi(`/artists/${id}`);

  const { data, error } = useSWR<IArtist>(
    () => (id ? [url, { ...headers, ...opts }] : null),
    fetcher
  );

  return {
    error,
    artist: data,
    isLoading: !error && !data
  };
};
