import { SPOTIFY_API } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';
import { useAccessHeaders } from '../useAccessHeaders';

export const useRecommendationsAvailableGenreSeeds = (opts = {}) => {
  const url = `${SPOTIFY_API}/recommendations/available-genre-seeds`;

  const headers = useAccessHeaders();

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
