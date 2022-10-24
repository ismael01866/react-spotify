import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { ITrack } from 'types/track';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const useRecommendations = (query = {}, opts = {}) => {
  const { headers, url: baseURL } = useSpotifyApi(`/recommendations`);
  const url = utilWithQueryParams(baseURL, query);

  const { data, error } = useSWR<{ tracks: ITrack[] }>(
    [url, { ...headers, ...opts }],
    fetcher
  );

  return {
    error,
    tracks: data?.tracks,
    isLoading: !error && !data
  };
};
