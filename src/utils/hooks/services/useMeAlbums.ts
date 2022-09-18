import { IAlbum } from 'src/types/album';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useMeAlbums = (query = {}, opts = {}) => {
  const url = utilWithQueryParams('/api/spotify/me/albums', query);
  const { data, error } = useSWR<IAlbum[]>([url, opts], fetcher);

  return {
    error,
    albums: data,
    isLoading: !error && !data
  };
};
