import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';
import { useSpotifyApi } from '../api';

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
