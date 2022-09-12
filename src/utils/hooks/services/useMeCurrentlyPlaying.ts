import { IAlbum } from 'src/types/album';
import { IArtist } from 'src/types/artist';
import { fetcher } from 'src/utils/fetch';
import useSWR from 'swr';

export const useMeCurrentlyPlaying = (opts = {}) => {
  const url = `/api/spotify/me/player/currently-playing`;
  const { data, error } = useSWR<{ album: IAlbum; artists: IArtist[] }>(
    [url, opts],
    fetcher
  );

  return {
    error,
    item: data,
    isLoading: !error && !data
  };
};
