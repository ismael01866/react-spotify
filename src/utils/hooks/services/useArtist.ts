import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';

export const useArtist = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/artists/${id}`;

  const { data, error } = useSWR<IArtist>([url, opts], fetcher);

  return {
    error,
    artist: data,
    isLoading: !error && !data
  };
};
