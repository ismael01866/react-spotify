import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const useMeArtistsAll = (query = {}, opts = {}) => {
  const url = utilWithQueryParams(
    '/api/spotify/custom/me/following/artists-all',
    {
      type: 'artist',
      ...query
    }
  );

  const { data, error } = useSWR<IArtist[]>(
    [url, { ...opts }],
    fetcher
  );

  return {
    error,
    artists: data,
    isLoading: !error && !data
  };
};
