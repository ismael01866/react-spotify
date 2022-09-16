import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';

export const useRecommendationsAvailableGenreSeeds = (opts = {}) => {
  const url = '/api/spotify/recommendations/available-genre-seeds';

  const { data, error } = useSWR<string[]>([url, opts], fetcher);

  return {
    error,
    genres: data,
    isLoading: !error && !data
  };
};
