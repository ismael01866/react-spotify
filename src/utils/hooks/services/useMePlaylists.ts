import { IPlaylist } from 'src/types/playlist';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';
import { useSpotifyApi } from '../useSpotifyApi';

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
