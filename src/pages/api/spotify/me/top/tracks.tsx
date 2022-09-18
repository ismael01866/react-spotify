import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from 'src/types/track';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = utilWithQueryParams(
    'https://api.spotify.com/v1/me/top/tracks',
    req.query
  );

  const { items }: { items: ITrack[] } = await fetchWithToken(req, url);
  const result = items || [];

  return res.status(200).json(result);
}
