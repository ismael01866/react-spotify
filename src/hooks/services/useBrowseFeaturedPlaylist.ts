import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { IPlaylist } from 'types/playlist';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const useBrowseFeaturedPlaylist = (query = {}, opts = {}) => {
  const { headers, url: baseURL } = useSpotifyApi(`/browse/featured-playlists`);

  const url = utilWithQueryParams(baseURL, query);

  const { data, error } = useSWR<{
    message: string;
    playlists: {
      items: IPlaylist[];
    };
  }>([url, { ...headers, ...opts }], fetcher);

  return {
    error,
    data: {
      message: data?.message,
      playlists: data?.playlists?.items
    },
    isLoading: !error && !data
  };
};
