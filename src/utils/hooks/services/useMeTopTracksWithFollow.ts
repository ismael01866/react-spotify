import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/utils';
import { ITrack } from 'src/types/track';
import useSWR from 'swr';

export const useMeTopTracksWithFollow = (query = {}, opts = {}) => {
  const url = withQueryParams(
    '/api/spotify/custom/me/top/tracks-with-follow',
    query
  );

  const { data, error } = useSWR<ITrack[]>([url, opts], fetcher);

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};
