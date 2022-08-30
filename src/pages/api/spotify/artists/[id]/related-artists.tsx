import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const url = withQueryParams(
    `https://api.spotify.com/v1/artists/${id}/related-artists`,
    req.query
  );

  const { artists } = await fetchWithToken(req, url);

  const result = artists || [];

  return res.status(200).json(result);
}
