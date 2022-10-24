import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { IAlbum } from 'types/album';
import { fetcher } from 'utils/fetch';

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
