import { ITrack } from 'src/types/track';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useMeTracksAll = (query = {}, opts = {}) => {
  const url = utilWithQueryParams(
    '/api/spotify/custom/me/tracks-all',
    query
  );

  const { data, error } = useSWR<ITrack[]>([url, opts], fetcher);

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};