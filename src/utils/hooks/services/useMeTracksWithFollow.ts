import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

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
