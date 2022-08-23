import { fetcher } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';
import { ITrack } from 'src/types/track';
import useSWR from 'swr';

export const useAlbumTracksWithFollow = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const url = withQueryParams(
    `/api/spotify/custom/albums/${id}/tracks-with-follow`,
    query
  );

  const { data, error } = useSWR<ITrack[]>([url, opts], fetcher);

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};
