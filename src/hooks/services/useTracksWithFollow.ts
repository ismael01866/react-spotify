import useSWR from 'swr';

import { ITrack } from 'types/track';
import { fetcher } from 'utils/fetch';

export const useTracksWithFollow = (
  id: string | string[] | undefined,
  opts = {}
) => {
  const url = `/api/spotify/custom/tracks-with-follow/${id}`;

  const { data, error } = useSWR<ITrack>(
    () => (id ? [url, opts] : null),
    fetcher
  );

  return {
    error,
    track: data,
    isLoading: !error && !data
  };
};
