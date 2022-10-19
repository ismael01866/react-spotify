import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';

export const useArtistWithFollow = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/custom/artists-with-follow/${id}`;

  const { data, error } = useSWR<IArtist>(
    () => (id ? [url, opts] : null),
    fetcher
  );

  return {
    error,
    artist: data,
    isLoading: !error && !data
  };
};
