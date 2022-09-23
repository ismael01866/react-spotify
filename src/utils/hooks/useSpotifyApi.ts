import { SPOTIFY_API } from '../constants';
import { useAccessHeaders } from './useAccessHeaders';

export const useSpotifyApi = (url: string) => {
  const headers = useAccessHeaders() || {};

  return { headers, url: `${SPOTIFY_API}${url}` };
};
