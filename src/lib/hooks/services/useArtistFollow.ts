import { fetcher } from 'src/lib/fetcher';
import useSWR from 'swr';

export const useArtistFollow = (ids: string[], opts: any = {}) => {
  const { data, error } = useSWR(
    [
      `/api/spotify/me/following/contains?type=artist&ids=${ids.join(
        ','
      )}`,
      opts
    ],
    fetcher
  );

  return {
    error,
    isFollowingArtist: data,
    isLoading: !error && !data
  };
};
