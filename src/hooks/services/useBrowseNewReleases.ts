import { IAlbum } from 'src/types/album';
import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';
import { useSpotifyApi } from 'src/hooks/api';

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
