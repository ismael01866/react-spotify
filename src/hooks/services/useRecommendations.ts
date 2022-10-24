import { ITrack } from 'src/types/track';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';
import { useSpotifyApi } from 'src/hooks/api';

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
