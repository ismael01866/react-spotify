import useSWR from 'swr';

import { IArtist } from 'types/artist';
import { fetcher } from 'utils/fetch';

export const useArtistWithFollow = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/custom/artists-with-follow/${id}`;

  const { data, error } = useSWR<IArtist>(
    () => (id ? [url, opts] : null),
    fetcher
  );

  return {
    error,
    artist: data,
    isLoading: !error && !data
  };
};
