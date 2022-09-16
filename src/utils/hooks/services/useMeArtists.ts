import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useMeArtists = (query = {}, opts = {}) => {
  const url = withQueryParams('/api/spotify/me/following', {
    type: 'artist',
    ...query
  });
  const { data, error } = useSWR<{ items: IArtist[] }, any>(
    [url, opts],
    fetcher
  );

  return {
    error,
    artists: data?.items,
    isLoading: !error && !data?.items
  };
};
