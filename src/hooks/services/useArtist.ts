import { useSpotifyApi } from 'src/hooks/api';
import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';

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
