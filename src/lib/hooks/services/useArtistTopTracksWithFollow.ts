import { fetcher } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';
import { ITrack } from 'src/types/track';
import useSWR from 'swr';

export const useArtistTopTracksWithFollow = (
  id: string | string[] | undefined,
  market: string,
  opts = {}
) => {
  const url = withQueryParams(
    `/api/spotify/custom/artists/${id}/top-tracks-with-follow`,
    {
      market
    }
  );

  const { data, error } = useSWR<ITrack[]>([url, opts], fetcher);

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};
