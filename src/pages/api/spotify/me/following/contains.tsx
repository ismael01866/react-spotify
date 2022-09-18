import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = utilWithQueryParams(
    'https://api.spotify.com/v1/me/following/contains',
    req.query
  );

  const data: boolean[] = await fetchWithToken(req, url);
  const result = data || [];

  return res.status(200).json(result);
}
