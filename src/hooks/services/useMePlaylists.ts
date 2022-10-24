import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { IPlaylist } from 'types/playlist';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const useMePlaylists = (query = {}, opts = {}) => {
  const { headers, url: baseURL } = useSpotifyApi(`/me/playlists`);

  const url = utilWithQueryParams(baseURL, query);

  const { data, error } = useSWR<{ items: IPlaylist[] }>(
    [url, { ...headers, ...opts }],
    fetcher
  );

  return {
    error,
    playlists: data?.items,
    isLoading: !error && !data
  };
};
