import { getToken } from 'next-auth/jwt';

import { fetcher } from 'src/lib/fetcher';
import { getSpotifyToken } from 'src/lib/spotify';

export const withToken = async (req: any, url: any) => {
  const token = await getToken({ req });
  const refresh_token = token?.refresh_token as string;

  const { access_token } = await getSpotifyToken(refresh_token);

  return fetcher(url, {
    headers: { Authorization: `Bearer ${access_token}` }
  });
};
