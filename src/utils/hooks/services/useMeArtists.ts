import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import useSWRInfinite from 'swr/infinite';

export const useMeArtists = (query = {}, opts = {}) => {
  const { data, error, size, setSize } = useSWRInfinite<{
    items: IArtist[];
    after: string;
  }>((pageIndex, previousPageData) => {
    const url = withQueryParams('/api/spotify/me/following', {
      type: 'artist',
      ...query
    });

    // reached the end
    if (previousPageData && !previousPageData.items) return null;

    // first page, no previous data
    if (pageIndex === 0) return [url, opts];

    // add the cursor to the API endpoint
    return [`${url}&after=${previousPageData?.after}`, opts];
  }, fetcher);

  const artists = data?.map((obj) => obj.items).flat();

  const isLoadingInitialData = !artists && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  return {
    error,
    artists,
    size,
    setSize,
    isLoadingMore,
    isLoadingInitialData
  };
};
