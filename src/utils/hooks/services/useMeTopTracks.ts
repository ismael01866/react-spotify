import { ITrack } from 'src/types/track';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';
import { useSpotifyApi } from '../api';

export const useMeTopTracks = (query = {}, opts = {}) => {
  const { headers, url: baseURL } = useSpotifyApi(`/me/top/tracks`);
  const url = utilWithQueryParams(baseURL, query);

  const { data, error } = useSWR<{ items: ITrack[] }>(
    [url, { ...headers, ...opts }],
    fetcher
  );

  return {
    error,
    tracks: data?.items,
    isLoading: !error && !data
  };
};
