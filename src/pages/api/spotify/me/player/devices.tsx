import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithToken } from 'src/utils/fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = 'https://api.spotify.com/v1/me/player/devices';
  const { devices } = await fetchWithToken(req, url);

  const result = devices || [];

  return res.status(200).json(result);
}
