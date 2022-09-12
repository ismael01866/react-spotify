import { useId } from 'react';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useArtistFollow = (query: {}, opts: any = {}) => {
  const url = withQueryParams(
    '/api/spotify/me/following/contains',
    Object.assign({ type: 'artist' }, query)
  );

  const cacheID = useId(); // used to prevent this request from getting cached

  const { data, error } = useSWR([url, { cacheID, ...opts }], fetcher);

  return {
    error,
    artistsFollowed: data,
    isLoading: !error && !data?.length
  };
};
