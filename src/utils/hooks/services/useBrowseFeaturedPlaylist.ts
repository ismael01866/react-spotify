import { IPlaylist } from 'src/types/playlist';
import { SPOTIFY_API } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';
import { useAccessHeaders } from '../useAccessHeaders';

export const useBrowseFeaturedPlaylist = (query = {}, opts = {}) => {
  const url = utilWithQueryParams(
    `${SPOTIFY_API}/browse/featured-playlists`,
    query
  );

  const headers = useAccessHeaders();

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
