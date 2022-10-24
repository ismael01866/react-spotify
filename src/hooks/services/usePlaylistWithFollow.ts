import useSWR from 'swr';

import { IPlaylist } from 'types/playlist';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const usePlaylistWithFollow = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const url = utilWithQueryParams(
    `/api/spotify/custom/playlists-with-follow/${id}`,
    query
  );

  const { data, error } = useSWR<IPlaylist>(
    () => (id ? [url, opts] : null),
    fetcher
  );

  return {
    error,
    playlist: data,
    isLoading: !error && !data
  };
};
