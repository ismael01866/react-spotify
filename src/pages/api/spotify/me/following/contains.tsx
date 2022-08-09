import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSpotifyToken } from 'src/lib/spotify';

import fetch from 'node-fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  const refresh_token = token?.refresh_token as string;

  const { access_token } = await getSpotifyToken(refresh_token);

  const { type, ids } = req.query;
  const query = `type=${type}&ids=${ids}`;

  const data = await fetch(
    `https://api.spotify.com/v1/me/following/contains?${query}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }
  ).then((res: any) => res.json());

  const result = data || false;

  return res.status(200).json(result);
}
