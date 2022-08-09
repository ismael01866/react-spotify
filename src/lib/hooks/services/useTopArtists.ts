import { fetcher } from 'src/lib/fetcher';
import { IArtist } from 'src/types/artist';
import useSWR from 'swr';

export const useTopArtists = (
  defaultValue: IArtist[] = [],
  opts: any = {}
) => {
  const { data, error } = useSWR<IArtist[]>(
    ['/api/spotify/me/top/artists', opts],
    fetcher
  );

  return {
    error,
    artists: data || defaultValue,
    isLoading: !error && !data
  };
};
