import useSWR from 'swr';

import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const useMeTracksWithFollow = (query = {}, opts = {}, SWROpts = {}) => {
  const url = utilWithQueryParams(
    `/api/spotify/custom/me/tracks-with-follow`,
    query
  );

  const { data, error } = useSWR<{
    items: SpotifyApi.PlaylistTrackObject[];
    total: number;
  }>([url, opts], fetcher, SWROpts);

  return {
    error,
    total: data?.total,
    tracks: data?.items,
    isLoading: !error && !data
  };
};
