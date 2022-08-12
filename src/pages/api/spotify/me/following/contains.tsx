import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithToken } from 'src/lib/fetch';
import { withQueryParams } from 'src/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = withQueryParams(
    'https://api.spotify.com/v1/me/following/contains',
    req.query
  );

  const { data } = await fetchWithToken(req, url);
  const result = data || false;

  return res.status(200).json(result);
}
