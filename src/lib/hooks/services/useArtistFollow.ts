import { fetcher } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';
import useSWR from 'swr';

export const useArtistFollow = (query: {}, opts: any = {}) => {
  const url = withQueryParams(
    '/api/spotify/me/following/contains',
    Object.assign({ type: 'artist' }, query)
  );

  const { data, error } = useSWR([url, opts], fetcher);

  return {
    error,
    isFollowingArtist: data,
    isLoading: !error && data
  };
};
