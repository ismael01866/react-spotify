import { IPlaylist } from 'src/types/playlist';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';

export const usePlaylist = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/playlists/${id}`;

  const { data, error } = useSWR<IPlaylist>([url, opts], fetcher);

  return {
    error,
    playlist: data,
    isLoading: !error && !data
  };
};
