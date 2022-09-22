import { fetcher } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';
import useSWRInfinite from 'swr/infinite';

export const useArtistAlbums = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const url = utilWithQueryParams(
    `/api/spotify/artists/${id}/albums`,
    query
  );

  const { data, error, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      // reached the end
      if (previousPageData && !previousPageData.items) return null;

      // first page, no previous data
      if (pageIndex === 0) return [url, opts];

      const offset = previousPageData?.limit + previousPageData?.offset;

      return [`${url}&offset=${offset}`, opts];
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
