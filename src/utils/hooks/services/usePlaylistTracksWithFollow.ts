import { useId } from 'react';
import { ITrack } from 'src/types/track';
import { fetcher } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';
import useSWR from 'swr';

export const usePlaylistTracksWithFollow = (
  id: string | string[] | undefined,
  query = {},
  opts = {}
) => {
  const url = withQueryParams(
    `/api/spotify/custom/playlists/${id}/tracks-with-follow`,
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
