import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const useTrackFollow = (query = {}, opts: any = {}) => {
  const { headers, url: baseURL } = useSpotifyApi(`/me/tracks/contains`);

  const url = utilWithQueryParams(baseURL, query);

  const { data, error } = useSWR([url, { ...headers, ...opts }], fetcher);

  return {
    error,
    tracksFollowed: data,
    isLoading: !error && !data?.length
  };
};
