import { useId } from 'react';
import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';

export const useArtistWithFollow = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/custom/artists-with-follow/${id}`;

  const cacheID = useId(); // used to prevent this request from getting cached

  const { data, error } = useSWR<IArtist>(
    [url, { cacheID, ...opts }],
    fetcher
  );

  return {
    error,
    artist: data,
    isLoading: !error && !data
  };
};
