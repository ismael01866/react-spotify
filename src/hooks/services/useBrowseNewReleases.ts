import useSWR from 'swr';

import { useSpotifyApi } from 'hooks/api';
import { IAlbum } from 'types/album';
import { fetcher } from 'utils/fetch';
import { utilWithQueryParams } from 'utils/helpers';

export const useBrowseNewReleases = (query = {}, opts = {}) => {
  const { headers, url: baseURL } = useSpotifyApi(`/browse/new-releases`);

  const url = utilWithQueryParams(baseURL, query);

  const { data, error } = useSWR<{
    albums: {
      items: IAlbum[];
    };
  }>([url, { ...headers, ...opts }], fetcher);

  return {
    error,
    albums: data?.albums?.items,
    isLoading: !error && !data
  };
};
