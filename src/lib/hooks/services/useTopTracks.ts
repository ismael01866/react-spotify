import { fetcher } from 'src/lib/fetcher';
import { ITrack } from 'src/types/track';
import useSWR from 'swr';

const URL = '/api/spotify/me/top/tracks';

export const useTopTracks = (query = {}, opts = {}) => {
  const params = new URLSearchParams(query);
  const url = `${URL}?${params.toString()}`;

  const { data, error } = useSWR<ITrack[]>([url, opts], fetcher);

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};
