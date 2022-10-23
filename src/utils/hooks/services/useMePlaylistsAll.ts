import { IPlaylist } from 'src/types/playlist';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useMePlaylistsAll = (query = {}, opts = {}) => {
  const url = utilWithQueryParams(
    '/api/spotify/custom/me/playlists-all',
    query
  );

  const { data, error } = useSWR<IPlaylist[]>([url, { ...opts }], fetcher);

  return {
    error,
    playlists: data,
    isLoading: !error && !data
  };
};
