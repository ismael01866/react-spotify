const querystring = require('querystring');

import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSpotifyToken } from 'src/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  const refresh_token = token?.refresh_token as string;

  const { access_token } = await getSpotifyToken(refresh_token);

  const { id } = req.query;

  const body = JSON.parse(req.body || '{}');
  const query = querystring.stringify({ limit: body.limit || 20 });

  const data = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }).then((res: any) => res.json());

  const result = data || {};

  return res.status(200).json(result);
}
