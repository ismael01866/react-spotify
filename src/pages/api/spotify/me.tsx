import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithToken } from 'src/lib/fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = 'https://api.spotify.com/v1/me';
  const data = await fetchWithToken(req, url);

  const result = data || {};

  return res.status(200).json(result);
}
