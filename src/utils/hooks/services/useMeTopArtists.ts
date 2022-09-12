import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useMeTopArtists = (query = {}, opts = {}) => {
  const url = withQueryParams('/api/spotify/me/top/artists', query);
  const { data, error } = useSWR<IArtist[]>([url, opts], fetcher);

  return {
    error,
    artists: data,
    isLoading: !error && !data
  };
};
