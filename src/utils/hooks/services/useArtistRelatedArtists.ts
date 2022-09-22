import { IArtist } from 'src/types/artist';
import { SPOTIFY_API } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';
import { useAccessHeaders } from '../useAccessHeaders';

export const useArtistRelatedArtists = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const url = utilWithQueryParams(
    `${SPOTIFY_API}/artists/${id}/related-artists`,
    query
  );

  const headers = useAccessHeaders();

  const { data: { artists } = {}, error } = useSWR<{
    artists: IArtist[];
  }>([url, { ...headers, ...opts }], fetcher);

  return {
    error,
    artists: artists,
    isLoading: !error && !artists
  };
};
