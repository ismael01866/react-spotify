import useSWR from 'swr';

import { ITrack } from 'types/track';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const usePlaylistTracksWithFollow = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const url = utilWithQueryParams(
    `/api/spotify/custom/playlists/${id}/tracks-with-follow`,
    query
  );

  const { data, error } = useSWR<ITrack[]>([url, opts], fetcher);

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};
