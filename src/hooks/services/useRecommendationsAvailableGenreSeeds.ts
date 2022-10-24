import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { fetcher } from 'utils/fetch';

export const useRecommendationsAvailableGenreSeeds = (opts = {}) => {
  const { headers, url } = useSpotifyApi(
    `/recommendations/available-genre-seeds`
  );

  const { data, error } = useSWR<string[]>(
    [url, { ...headers, ...opts }],
    fetcher
  );

  return {
    error,
    genres: data,
    isLoading: !error && !data
  };
};
