import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';
import { useSpotifyApi } from '../api';

export const useArtist = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const { headers, url } = useSpotifyApi(`/artists/${id}`);

  const { data, error } = useSWR<IArtist>(
    [url, { ...headers, ...opts }],
    fetcher
  );

  return {
    error,
    artist: data,
    isLoading: !error && !data
  };
};
