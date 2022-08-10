import { fetcher } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';
import { ITrack } from 'src/types/track';
import useSWR from 'swr';

export const useTopTracks = (query = {}, opts = {}) => {
  const url = withQueryParams('/api/spotify/me/top/tracks', query);
  const { data, error } = useSWR<ITrack[]>([url, opts], fetcher);

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};
