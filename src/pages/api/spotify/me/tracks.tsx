import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = withQueryParams(
    'https://api.spotify.com/v1/me/tracks',
    req.query
  );

  let isFollowing = false;

  await fetchWithToken(req, url, {
    method: req.method
  }).then(() => {
    isFollowing = req.method === 'PUT' ? true : false;
  });

  return res.status(200).json({ isFollowing });
}
