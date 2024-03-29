import { SPOTIFY_API } from 'utils/constants';

import { useAccessHeaders } from '../auth';

export const useSpotifyApi = (url: string) => {
  const headers = useAccessHeaders() || {};

  return { headers, url: `${SPOTIFY_API}${url}` };
};
