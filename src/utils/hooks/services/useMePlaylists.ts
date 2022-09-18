import { IPlaylist } from 'src/types/playlist';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useMePlaylists = (query = {}, opts = {}) => {
  const url = utilWithQueryParams('/api/spotify/me/playlists', query);
  const { data, error } = useSWR<IPlaylist[]>([url, opts], fetcher);

  return {
    error,
    playlists: data,
    isLoading: !error && !data
  };
};
