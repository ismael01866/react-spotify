import { IArtist } from 'src/types/artist';
import { SPOTIFY_API } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';
import { useAccessHeaders } from '../useAccessHeaders';

export const useArtist = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `${SPOTIFY_API}/artists/${id}`;

  const headers = useAccessHeaders();

  const { data, error } = useSWR<IArtist>(
    [url, { ...headers, ...opts }],
    fetcher
  );

  return {
    error,
    artist: data,
    isLoading: !error && !data
  };
};
