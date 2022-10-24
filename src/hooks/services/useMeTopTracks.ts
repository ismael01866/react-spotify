import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { ITrack } from 'types/track';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

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
