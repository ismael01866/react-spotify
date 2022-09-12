import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = withQueryParams(
    'https://api.spotify.com/v1/me/player/currently-playing',
    req.query
  );

  const { item } = await fetchWithToken(req, url);

  const result = item || {};

  return res.status(200).json(result);
}
