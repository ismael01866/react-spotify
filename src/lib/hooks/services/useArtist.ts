import { fetcher } from 'src/lib/fetcher';
import { IArtist } from 'src/types/artist';
import useSWR from 'swr';

export const useArtist = (
  id: string | string[] | undefined,
  defaultValue: IArtist = {},
  opts: any = {}
) => {
  const { data, error } = useSWR<IArtist>(
    [`/api/spotify/artists/${id}`, opts],
    fetcher
  );

  return {
    error,
    artist: data || defaultValue,
    isLoading: !error && !data
  };
};
