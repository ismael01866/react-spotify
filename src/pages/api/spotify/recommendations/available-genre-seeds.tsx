import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithToken } from 'src/utils/fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url =
    'https://api.spotify.com/v1/recommendations/available-genre-seeds';

  const { genres }: { genres: string[] } = await fetchWithToken(
    req,
    url
  );

  const result = genres || [];

  return res.status(200).json(result);
}
