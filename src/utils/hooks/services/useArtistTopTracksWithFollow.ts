import { ITrack } from 'src/types/track';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useArtistTopTracksWithFollow = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const url = withQueryParams(
    `/api/spotify/custom/artists/${id}/top-tracks-with-follow`,
    query
  );

  const { data, error } = useSWR<ITrack[]>([url, { ...opts }], fetcher);

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};
