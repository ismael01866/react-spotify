import { IPlaylist } from 'src/types/playlist';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';
import { useSpotifyApi } from 'src/hooks/api';

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
