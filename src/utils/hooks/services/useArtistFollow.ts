import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useArtistFollow = (query = {}, opts: any = {}) => {
  const url = utilWithQueryParams(
    '/api/spotify/me/following/contains',
    Object.assign({ type: 'artist' }, query)
  );

  const { data, error } = useSWR([url, { ...opts }], fetcher);

  return {
    error,
    artists: data,
    isLoading: !error && !data?.length
  };
};
