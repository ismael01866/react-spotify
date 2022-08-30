import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/utils';
import { IArtist } from 'src/types/artist';
import useSWR from 'swr';

export const useArtistRelatedArtists = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const url = withQueryParams(
    `/api/spotify/artists/${id}/related-artists`,
    query
  );

  const { data, error } = useSWR<IArtist[]>([url, opts], fetcher);

  return {
    error,
    artists: data,
    isLoading: !error && !data
  };
};