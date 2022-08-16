import { fetcher } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';
import useSWR from 'swr';

export const useTrackFollow = (query: {}, opts: any = {}) => {
  const url = withQueryParams('/api/spotify/me/tracks/contains', query);

  const { data, error } = useSWR([url, opts], fetcher);

  return {
    error,
    tracksFollowed: data,
    isLoading: !error && !data?.length
  };
};
