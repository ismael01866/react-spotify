import useSWR from 'swr';

import { IArtist } from 'types/artist';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const useMeArtistsAll = (query = {}, opts = {}) => {
  const url = utilWithQueryParams(
    '/api/spotify/custom/me/following/artists-all',
    {
      type: 'artist',
      ...query
    }
  );

  const { data, error } = useSWR<IArtist[]>([url, opts], fetcher);

  return {
    error,
    artists: data,
    isLoading: !error && !data
  };
};
