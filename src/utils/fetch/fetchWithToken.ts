import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';

import { fetcher } from 'src/utils/fetch';
import { getSpotifyToken } from 'src/utils/spotify';

export const fetchWithToken = async (
  req: NextApiRequest,
  url: string,
  opts = {}
) => {
  const token = await getToken({ req });
  const refresh_token = token?.refresh_token as string;

  const { access_token } = await getSpotifyToken(refresh_token);

  return fetcher(url, {
    headers: { Authorization: `Bearer ${access_token}` },
    ...opts
  });
};
