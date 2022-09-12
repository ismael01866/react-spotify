import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import { ITrack } from 'src/types/track';
import useSWR from 'swr';
import { useId } from 'react';

export const useAlbumTracksWithFollow = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const url = withQueryParams(
    `/api/spotify/custom/albums/${id}/tracks-with-follow`,
    query
  );

  const cacheID = useId(); // used to prevent this request from getting cached

  const { data, error } = useSWR<ITrack[]>(
    [url, { cacheID, ...opts }],
    fetcher
  );

  return {
    error,
    tracks: data,
    isLoading: !error && !data
  };
};
