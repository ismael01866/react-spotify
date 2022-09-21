import { ITrack } from 'src/types/track';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useMeTracks = (query = {}, opts = {}) => {
  const url = utilWithQueryParams('/api/spotify/me/tracks', query);
  const { data, error } = useSWR<ITrack[]>([url, opts], fetcher);

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};
