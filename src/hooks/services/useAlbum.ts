import { useSpotifyApi } from 'src/hooks/api';
import { IAlbum } from 'src/types/album';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';

export const useAlbum = (id: string | string[] | undefined, opts = {}) => {
  const { headers, url } = useSpotifyApi(`/albums/${id}`);

  const { data, error } = useSWR<IAlbum>(
    () => (id ? [url, { ...headers, ...opts }] : null),
    fetcher
  );

  return {
    error,
    album: data,
    isLoading: !error && !data
  };
};
