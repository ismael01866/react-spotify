import { withQueryParams, withToken } from 'src/lib/handlers';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = withQueryParams(
    req,
    'https://api.spotify.com/v1/me/top/tracks'
  );

  console.log(url);

  const { items } = await withToken(req, url);
  const result = items || [];

  return res.status(200).json(result);
}
