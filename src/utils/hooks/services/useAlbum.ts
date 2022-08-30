import { fetcher } from 'src/utils/fetch';
import { IAlbum } from 'src/types/album';
import useSWR from 'swr';

export const useAlbum = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/albums/${id}`;

  const { data, error } = useSWR<IAlbum>([url, opts], fetcher);

  return {
    error,
    album: data,
    isLoading: !error && !data
  };
};
