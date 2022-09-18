import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useAlbumFollow = (query = {}, opts: any = {}) => {
  const url = utilWithQueryParams(
    '/api/spotify/me/albums/contains',
    query
  );

  const { data, error } = useSWR([url, opts], fetcher);

  return {
    error,
    albumsFollowed: data,
    isLoading: !error && !data?.length
  };
};
