import { fetcher } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';
import { IArtist } from 'src/types/artist';
import useSWR from 'swr';

export const useTopArtists = (query = {}, opts = {}) => {
  const url = withQueryParams('/api/spotify/me/top/artists', query);
  const { data, error } = useSWR<IArtist[]>([url, opts], fetcher);

  return {
    error,
    artists: data,
    isLoading: !error && !data
  };
};
