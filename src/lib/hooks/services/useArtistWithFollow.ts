import { fetcher } from 'src/lib/fetch';
import { IArtist } from 'src/types/artist';
import useSWR from 'swr';

export const useArtistWithFollow = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/custom/artists-with-follow/${id}`;

  const { data, error } = useSWR<IArtist>([url, opts], fetcher);

  return {
    error,
    artist: data,
    isLoading: !error && !data
  };
};
