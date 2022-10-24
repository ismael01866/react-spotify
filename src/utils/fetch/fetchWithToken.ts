import moment from 'moment';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

import { fetcher } from 'utils/fetch';

import { getSpotifyToken } from '../spotify';

export const fetchWithToken = async (
  req: NextApiRequest,
  url: string,
  opts = {}
) => {
  const token = await getToken({ req });

  const tokenHasExpired =
    moment(Date.now()).unix() > (token!.expires_at as Number);

  // refresh token

  if (token && tokenHasExpired) {
    const { access_token, expires_in } = await getSpotifyToken(
      token.refresh_token as string
    );

    token.expires_at = moment(Date.now())
      .add(expires_in / 60, 'minutes')
      .unix();

    token.access_token = access_token;
  }

  return fetcher(url, {
    headers: { Authorization: `Bearer ${token!.access_token}` },
    ...opts
  });
};
