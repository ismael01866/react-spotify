import useSWR from 'swr';

import { IAlbum } from 'types/album';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const useMeAlbumsAll = (query = {}, opts = {}) => {
  const url = utilWithQueryParams('/api/spotify/custom/me/albums-all', {
    type: 'artist',
    ...query
  });

  const { data, error } = useSWR<IAlbum[]>([url, opts], fetcher);

  return {
    error,
    albums: data,
    isLoading: !error && !data
  };
};
