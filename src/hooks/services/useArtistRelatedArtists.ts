import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { IArtist } from 'types/artist';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const useArtistRelatedArtists = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const { headers, url: baseURL } = useSpotifyApi(
    `/artists/${id}/related-artists`
  );

  const url = utilWithQueryParams(baseURL, query);

  const { data, error } = useSWR<{
    artists: IArtist[];
  }>([url, { ...headers, ...opts }], fetcher);

  return {
    error,
    artists: data?.artists,
    isLoading: !error && !data
  };
};
