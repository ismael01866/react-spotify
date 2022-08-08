import { fetcher } from 'src/lib/fetch';
import { ITrack } from 'src/types/track';
import useSWR from 'swr';

export const useTopTracks = (
  defaultValue: ITrack[] = [],
  opts: any = {}
) => {
  const { data, error } = useSWR<ITrack[]>(
    ['/api/spotify/me/top/tracks', opts],
    fetcher
  );

  return {
    error,
    tracks: data || defaultValue,
    isLoading: !error && !data
  };
};
