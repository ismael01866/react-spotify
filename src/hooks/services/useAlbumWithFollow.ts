import useSWR from 'swr';

import { IAlbum } from 'types/album';
import { fetcher } from 'utils/fetch';

export const useAlbumWithFollow = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/custom/albums-with-follow/${id}`;

  const { data, error } = useSWR<IAlbum>(
    () => (id ? [url, opts] : null),
    fetcher
  );

  return {
    error,
    album: data,
    isLoading: !error && !data
  };
};
