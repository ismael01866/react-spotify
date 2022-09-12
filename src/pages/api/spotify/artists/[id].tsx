import { NextApiRequest, NextApiResponse } from 'next';
import { IArtist } from 'src/types/artist';
import { fetchWithToken } from 'src/utils/fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const url = `https://api.spotify.com/v1/artists/${id}`;

  const data: IArtist = await fetchWithToken(req, url);
  const result = data || {};

  return res.status(200).json(result);
}
