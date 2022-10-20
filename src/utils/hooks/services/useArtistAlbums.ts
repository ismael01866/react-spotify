import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWRInfinite from 'swr/infinite';
import { useSpotifyApi } from '../api';

export const useArtistAlbums = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const { headers, url: baseURL } = useSpotifyApi(
    `/artists/${id}/albums`
  );

  const url = utilWithQueryParams(baseURL, query);

  const { data, error, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      // reached the end
      if (previousPageData && !previousPageData.items) return null;

      // first page, no previous data
      if (pageIndex === 0) return [url, { ...headers, ...opts }];

      const offset = previousPageData?.limit + previousPageData?.offset;

      return [`${url}&offset=${offset}`, { ...headers, ...opts }];
    },
    fetcher
  );

  const albums = data?.map((obj) => obj.items).flat();

  const isLoadingInitialData = !albums && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  const isEmpty =
    !isLoadingInitialData && data?.[size - 1]?.items.length === 0;

  return {
    error,
    albums,
    size,
    setSize,
    isEmpty,
    isLoadingMore,
    isLoadingInitialData
  };
};
