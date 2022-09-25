import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';
import { useSpotifyApi } from '../api';

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
