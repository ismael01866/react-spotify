import { NextApiRequest, NextApiResponse } from 'next';
import { IAlbum } from 'src/types/album';
import { fetchWithToken } from 'src/utils/fetch';
import { withQueryParams } from 'src/utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = withQueryParams(
    'https://api.spotify.com/v1/me/albums',
    req.query
  );

  if (req.method === ('PUT' || 'DELETE')) {
    let isFollowing = false;

    await fetchWithToken(req, url, {
      method: req.method
    }).then(() => {
      isFollowing = req.method === 'PUT' ? true : false;
    });

    return res.status(200).json({ isFollowing });
  }

  const { items }: { items: IAlbum[] } = await fetchWithToken(req, url);

  const result = items || [];

  return res.status(200).json(result);
}
