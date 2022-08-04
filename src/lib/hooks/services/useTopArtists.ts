import useSWR from 'swr';
import { fetcher } from 'src/lib/fetch';
import { IArtist } from 'src/types/artist';

export const useTopArtists = (
  defaultValue: IArtist[] = [],
  opts: any = {}
) => {
  const { data, error } = useSWR<IArtist[]>(
    ['api/spotify/me/top/artists', opts],
    fetcher
  );

  return {
    error,
    artists: data || defaultValue,
    isLoading: !error && !data
  };
};
