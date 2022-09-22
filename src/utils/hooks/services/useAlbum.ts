import { IAlbum } from 'src/types/album';
import { SPOTIFY_API } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';
import { useAccessHeaders } from '../useAccessHeaders';

export const useAlbum = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `${SPOTIFY_API}/artists/${id}/related-artists`;

  const headers = useAccessHeaders();

  const { data, error } = useSWR<IAlbum>(
    [url, { ...headers, ...opts }],
    fetcher
  );

  return {
    error,
    album: data,
    isLoading: !error && !data
  };
};
