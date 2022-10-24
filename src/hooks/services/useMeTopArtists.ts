import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { IArtist } from 'types/artist';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const useMeTopArtists = (query = {}, opts = {}) => {
  const { headers, url: baseURL } = useSpotifyApi(`/me/top/artists`);
  const url = utilWithQueryParams(baseURL, query);

  const { data, error } = useSWR<{ items: IArtist[] }>(
    [url, { ...headers, ...opts }],
    fetcher
  );

  return {
    error,
    artists: data?.items,
    isLoading: !error && !data
  };
};
