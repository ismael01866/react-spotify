import useSWR from 'swr';

import { IPlaylist } from 'types/playlist';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

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
