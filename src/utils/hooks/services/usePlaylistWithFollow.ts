import { IPlaylist } from 'src/types/playlist';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

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
