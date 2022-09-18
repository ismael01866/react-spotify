import { NextApiRequest, NextApiResponse } from 'next';
import { IArtist } from 'src/types/artist';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = utilWithQueryParams(
    'https://api.spotify.com/v1/me/top/artists',
    req.query
  );

  const { items }: { items: IArtist[] } = await fetchWithToken(
    req,
    url
  );

  const result = items || [];

  return res.status(200).json(result);
}
