import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithToken } from 'src/utils/fetch';
import { utilWithQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = utilWithQueryParams(
    'https://api.spotify.com/v1/me/following',
    req.query
  );

  if (req.method === 'PUT' || req.method === 'DELETE') {
    let isFollowing = false;

    await fetchWithToken(req, url, {
      method: req.method
    }).then(() => {
      isFollowing = req.method === 'PUT' ? true : false;
    });

    return res.status(200).json({ isFollowing });
  }
}
