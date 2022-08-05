const querystring = require('querystring');

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

  const body = JSON.parse(req.body || '{}');
  const query = querystring.stringify({ device_id: body.device_id });

  console.log(`https://api.spotify.com/v1/me/player/play?${query}`, {
    body: JSON.stringify({
      uris: body.uris,
      context_uri: body.context_uri
    })
  });

  await fetch(`https://api.spotify.com/v1/me/player/play?${query}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify({
      uris: body.uris,
      context_uri: body.context_uri
    })
  })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);

      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  return res.status(200).send('success');
}
