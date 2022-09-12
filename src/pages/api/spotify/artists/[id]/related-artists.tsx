import { NextApiRequest, NextApiResponse } from 'next';
import { IArtist } from 'src/types/artist';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const url = withQueryParams(
    `https://api.spotify.com/v1/artists/${id}/related-artists`,
    req.query
  );

  const { artists }: { artists: IArtist[] } = await fetchWithToken(
    req,
    url
  );

  const result = artists || [];

  return res.status(200).json(result);
}
