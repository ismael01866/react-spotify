import { IAlbum } from 'src/types/album';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';

export const useAlbumWithFollow = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/custom/albums-with-follow/${id}`;

  const { data, error } = useSWR<IAlbum>([url, opts], fetcher);

  return {
    error,
    album: data,
    isLoading: !error && !data
  };
};
