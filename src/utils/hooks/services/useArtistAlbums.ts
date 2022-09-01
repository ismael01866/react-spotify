import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/utils';
import { IAlbum } from 'src/types/album';
import useSWR from 'swr';

export const useArtistAlbums = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const url = withQueryParams(
    `/api/spotify/artists/${id}/albums`,
    query
  );

  const { data, error } = useSWR<IAlbum[]>([url, opts], fetcher);

  return {
    error,
    albums: data,
    isLoading: !error && !data
  };
};
