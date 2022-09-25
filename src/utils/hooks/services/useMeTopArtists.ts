import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';
import { useSpotifyApi } from '../api';

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
