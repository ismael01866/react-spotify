import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/utils';
import { ITrack } from 'src/types/track';
import useSWR from 'swr';

export const useArtistTopTracks = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const url = withQueryParams(
    `/api/spotify/artists/${id}/top-tracks`,
    query
  );

  const { data, error } = useSWR<ITrack[]>([url, opts], fetcher);

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};