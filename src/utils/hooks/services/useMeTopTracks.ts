import { ITrack } from 'src/types/track';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useMeTopTracks = (query = {}, opts = {}) => {
  const url = withQueryParams('/api/spotify/me/top/tracks', query);
  const { data, error } = useSWR<ITrack[]>([url, opts], fetcher);

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};
