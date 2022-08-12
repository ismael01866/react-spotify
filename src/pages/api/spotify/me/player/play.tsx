import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithToken } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = withQueryParams(
    'https://api.spotify.com/v1/me/player/play',
    req.query
  );

  const { uris, context_uri } = JSON.parse(req.body);

  await fetchWithToken(req, url, {
    method: 'PUT',
    body: JSON.stringify({ uris, context_uri })
  });

  return res.status(200).json('success');
}
