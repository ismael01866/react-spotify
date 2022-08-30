import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/utils';
import useSWR from 'swr';

export const useArtistFollow = (query: {}, opts: any = {}) => {
  const url = withQueryParams(
    '/api/spotify/me/following/contains',
    Object.assign({ type: 'artist' }, query)
  );

  const { data, error } = useSWR([url, opts], fetcher);

  return {
    error,
    artistsFollowed: data,
    isLoading: !error && !data?.length
  };
};
