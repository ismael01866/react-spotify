import { fetcher } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';
import useSWR from 'swr';

export const useAlbumFollow = (query: {}, opts: any = {}) => {
  const url = withQueryParams('/api/spotify/me/albums/contains', query);

  const { data, error } = useSWR([url, opts], fetcher);

  return {
    error,
    albumsFollowed: data,
    isLoading: !error && !data?.length
  };
};
