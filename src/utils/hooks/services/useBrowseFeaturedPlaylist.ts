import { IPlaylist } from 'src/types/playlist';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useBrowseFeaturedPlaylist = (query = {}, opts = {}) => {
  const url = withQueryParams(
    '/api/spotify/browse/featured-playlists',
    query
  );
  const { data, error } = useSWR<{
    message: string;
    items: IPlaylist[];
  }>([url, opts], fetcher);

  return {
    error,
    data: {
      message: data?.message,
      playlists: data?.items
    },
    isLoading: !error && !data
  };
};